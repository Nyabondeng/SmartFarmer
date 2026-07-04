const CACHE_NAME = 'smartfarmer-v' + Date.now();
const OFFLINE_CACHE = 'smartfarmer-offline-v1';

// Files to cache for offline use
const OFFLINE_FILES = [
    '/',
    '/index.html',
    '/about.html',
    '/crops.html',
    '/education.html',
    '/crop-log.html',
    '/ussd.html',
    '/farmer-login.html',
    '/farmer-register.html',
    '/styles/styles.css',
    '/styles/crops.css',
    '/styles/education.css',
    '/styles/about.css',
    '/styles/crop-log.css',
    '/styles/ussd.css',
    '/styles/farmer-auth.css',
    '/js/translations.js',
    '/js/script.js',
    '/js/crops.js',
    '/js/education.js',
    '/js/farmer-auth.js',
    '/js/ussd.js',
    '/images/smartfarmer.png'
];

// ── INSTALL: cache offline files ─────────────────────────────
self.addEventListener('install', event => {
    console.log('[SW] Installing...');
    event.waitUntil(
        caches.open(OFFLINE_CACHE).then(cache => {
            console.log('[SW] Caching offline files');
            return cache.addAll(
                OFFLINE_FILES.filter(url => !url.startsWith('chrome-extension'))
            );
        }).then(() => self.skipWaiting())
    );
});

// ── ACTIVATE: delete old caches ──────────────────────────────
self.addEventListener('activate', event => {
    console.log('[SW] Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== OFFLINE_CACHE)
                    .map(name => {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// ── FETCH: network-first, fallback to cache ───────────────────
self.addEventListener('fetch', event => {
    // Skip non-http requests (chrome extensions etc)
    if (!event.request.url.startsWith('http')) return;

    // Skip POST requests
    if (event.request.method !== 'GET') return;

    event.respondWith(
        // Always try network first
        fetch(event.request)
            .then(networkResponse => {
                // Got a good response from network
                if (networkResponse && networkResponse.status === 200) {
                    // Update the offline cache with the new response
                    const responseClone = networkResponse.clone();
                    caches.open(OFFLINE_CACHE).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                // Network failed — serve from cache (offline mode)
                return caches.match(event.request).then(cachedResponse => {
                    if (cachedResponse) {
                        console.log('[SW] Serving from cache (offline):', event.request.url);
                        return cachedResponse;
                    }
                    // Nothing in cache either — return offline page
                    return caches.match('/index.html');
                });
            })
    );
});

// ── MESSAGE: force update from app ───────────────────────────
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
