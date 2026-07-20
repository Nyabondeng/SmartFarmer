const OFFLINE_CACHE = 'smartfarmer-offline-v2';

// Files to cache for offline use
const OFFLINE_FILES = [
    '/',
    '/index.html',
    '/about.html',
    '/crops.html',
    '/education.html',
    '/crop-log.html',
    '/cost-forecast.html',
    '/fertilizer.html',
    '/ussd.html',
    '/farmer-login.html',
    '/farmer-register.html',
    '/success.html',
    '/offline.html',
    '/manifest.json',
    '/modules/module-planting.html',
    '/modules/module-pest.html',
    '/modules/module-postharvest.html',
    '/modules/module-soil.html',
    '/modules/module-climate.html',
    '/modules/module-water.html',
    '/modules/module-market.html',
    '/modules/module-disease.html',
    '/modules/module-fertilizer.html',
    '/modules/module-tools.html',
    '/styles/styles.css',
    '/styles/crops.css',
    '/styles/education.css',
    '/styles/about.css',
    '/styles/crop-log.css',
    '/styles/cost-forecast.css',
    '/styles/fertilizer.css',
    '/styles/ussd.css',
    '/styles/farmer-auth.css',
    '/styles/footer.css',
    '/styles/navbar.css',
    '/styles/module-detail.css',
    '/js/translations.js',
    '/js/script.js',
    '/js/crops.js',
    '/js/education.js',
    '/js/crop-log.js',
    '/js/cost-forecast.js',
    '/js/fertilizer.js',
    '/js/module-detail.js',
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
            return cache.addAll(OFFLINE_FILES);
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

    // Leave cross-origin requests (backend API, fonts) to the network
    if (new URL(event.request.url).origin !== self.location.origin) return;

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
                // Network failed — serve from cache (offline mode).
                // ignoreSearch so "/js/script.js?v=2" matches the cached "/js/script.js"
                return caches.match(event.request, { ignoreSearch: true }).then(cachedResponse => {
                    if (cachedResponse) {
                        console.log('[SW] Serving from cache (offline):', event.request.url);
                        return cachedResponse;
                    }
                    // Page navigation with nothing cached — show the offline page
                    if (event.request.mode === 'navigate') {
                        return caches.match('/offline.html');
                    }
                    return Response.error();
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
