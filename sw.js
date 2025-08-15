// Service Worker for improved performance and offline functionality
const CACHE_NAME = 'alexey-panfilov-v1.2';
const STATIC_CACHE = 'static-v1.2';
const DYNAMIC_CACHE = 'dynamic-v1.2';

// Resources to cache immediately
const STATIC_FILES = [
    '/',
    '/index.html',
    '/style.css',
    '/web/localization.js',
    '/web/theme.js',
    '/web/projects.js',
    '/web/contacts.js',
    '/web/animation.js',
    '/web/optimization.js',
    '/projects.json',
    '/manifest.json'
];

// Install event - cache static resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE)
                    .map(cacheName => caches.delete(cacheName))
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Handle navigation requests
    if (request.mode === 'navigate') {
        event.respondWith(
            caches.match(request)
                .then(response => {
                    return response || fetch(request);
                })
                .catch(() => {
                    return caches.match('/index.html');
                })
        );
        return;
    }

    // Handle static assets
    if (STATIC_FILES.includes(url.pathname)) {
        event.respondWith(
            caches.match(request)
                .then(response => {
                    return response || fetch(request).then(fetchResponse => {
                        return caches.open(STATIC_CACHE).then(cache => {
                            // Only cache GET requests
                            if (request.method === 'GET') {
                                cache.put(request, fetchResponse.clone());
                            }
                            return fetchResponse;
                        });
                    });
                })
        );
        return;
    }

    // Handle external resources with stale-while-revalidate strategy
    if (url.origin !== location.origin) {
        event.respondWith(
            caches.open(DYNAMIC_CACHE).then(cache => {
                return cache.match(request).then(response => {
                    const fetchPromise = fetch(request).then(fetchResponse => {
                        // Only cache GET requests
                        if (request.method === 'GET') {
                            cache.put(request, fetchResponse.clone());
                        }
                        return fetchResponse;
                    });
                    return response || fetchPromise;
                });
            })
        );
        return;
    }

    // Default: try cache first, fallback to network
    event.respondWith(
        caches.match(request)
            .then(response => {
                return response || fetch(request);
            })
    );
});

// Background sync for analytics and other non-critical requests
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Handle any background sync tasks here
            Promise.resolve()
        );
    }
});

// Push notification handling (for future use)
self.addEventListener('push', event => {
    if (event.data) {
        const options = {
            body: event.data.text(),
            icon: '/favicon.ico',
            badge: '/badge.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            }
        };
        
        event.waitUntil(
            self.registration.showNotification('Alexey Panfilov Portfolio', options)
        );
    }
});