// Smart Farmer Service Worker - Enables offline access

const CACHE_NAME = 'smart-farmer-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/crops.html',
    '/education.html',
    '/crop-log.html',
    '/contact.html',
    '/ussd.html',
    '/styles/style.css',
    '/styles/crops.css',
    '/styles/education.css',
    '/styles/crop-log.css',
    '/styles/contact.css',
    '/styles/about.css',
    '/js/script.js',
    '/js/translations.js',
    '/js/main.js',
    '/js/contact.js',
    '/js/ussd.js',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.log('Cache failed:', error);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).catch(() => {
                    // Return index.html for any navigation request when offline
                    if (event.request.mode === 'navigate') {
                        return caches.match('/index.html');
                    }
                    return new Response('Offline');
                });
            })
    );
});

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
    );
});
