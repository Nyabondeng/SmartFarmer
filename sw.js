// Smart Farmer Service Worker - Enables offline access

const CACHE_NAME = 'smart-farmer-v3';
const OFFLINE_URL = '/offline.html';

// Files to cache for offline use
const urlsToCache = [
    // Core pages
    '/',
    '/index.html',
    '/about.html',
    '/crops.html',
    '/education.html',
    '/crop-log.html',
    '/contact.html',
    '/ussd.html',
    '/offline.html',

    // Module pages (NEW)
    '/modules/module-planting.html',
    '/modules/module-pest.html',
    '/modules/module-postharvest.html',
    '/modules/module-soil.html',
    '/modules/module-climate.html',
    '/modules/module-water.html',
    '/modules/module-market.html',
    '/modules/module-fertilizer.html',
    '/modules/module-disease.html',
    '/modules/module-tools.html',

    // CSS files
    '/styles/style.css',
    '/styles/home.css',
    '/styles/about.css',
    '/styles/crops.css',
    '/styles/education.css',
    '/styles/crop-log.css',
    '/styles/contact.css',
    '/styles/ussd.css',
    '/styles/module-detail.css',  // NEW

    // JavaScript files
    '/js/script.js',
    '/js/translations.js',
    '/js/education.js',      // NEW
    '/js/module-detail.js',  // NEW
    '/js/contact.js',
    '/js/ussd.js',
    '/js/crop-log.js',
    '/js/crops.js',

    // Images (add all your images)
    '/images/smartfarmer.png',
    '/images/hero-farming.jpg',
    '/images/farmer.jpg',
    '/images/planting.jpg',
    '/images/pest.jpg',
    '/images/postharvest.jpg',
    '/images/soil.jpg',
    '/images/climate.jpg',
    '/images/water.jpg',
    '/images/market.jpg',
    '/images/fertilizer.jpg',
    '/images/disease.jpg',
    '/images/tools.jpg',
    '/images/sorghum.jpg',
    '/images/maize.jpg',
    '/images/millet.jpg',
    '/images/groundnuts.jpg',
    '/images/cassava.jpg'
];

// Install event - cache all files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                // Force the waiting service worker to become active
                return self.skipWaiting();
            })
            .catch(error => {
                console.log('Cache failed:', error);
            })
    );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            // Take control of all open clients
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network, then offline page
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    // Return cached version
                    return response;
                }

                // Try to fetch from network
                return fetch(event.request)
                    .then(networkResponse => {
                        // Check if we got a valid response
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }

                        // Clone the response and cache it for next time
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return networkResponse;
                    })
                    .catch(() => {
                        // If both cache and network fail, show offline page
                        if (event.request.mode === 'navigate') {
                            return caches.match(OFFLINE_URL);
                        }
                        // For images/assets, return a fallback
                        if (event.request.destination === 'image') {
                            return caches.match('/images/smartfarmer.png');
                        }
                        return new Response('Offline', { status: 503 });
                    });
            })
    );
});
