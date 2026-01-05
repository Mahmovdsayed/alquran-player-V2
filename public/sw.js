

const CACHE_NAME = 'alquran-player-v1';
const STATIC_CACHE = 'alquran-static-v1';
const DYNAMIC_CACHE = 'alquran-dynamic-v1';

const STATIC_ASSETS = [
    '/',
    '/manifest.webmanifest',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/Basmala.svg',
    '/Basmala-dark.svg',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            console.log('[SW] Caching static assets');
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
                    .map((key) => {
                        console.log('[SW] Removing old cache:', key);
                        return caches.delete(key);
                    })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    if (request.method !== 'GET') return;

    if (!url.protocol.startsWith('http')) return;

    if (url.hostname.includes('api.quran.com') || url.hostname.includes('qurancdn.com')) {
        event.respondWith(networkFirst(request, DYNAMIC_CACHE));
        return;
    }

    if (
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'font' ||
        request.destination === 'image' ||
        url.pathname.startsWith('/_next/static/')
    ) {
        event.respondWith(cacheFirst(request, STATIC_CACHE));
        return;
    }

    if (request.destination === 'document') {
        event.respondWith(networkFirst(request, DYNAMIC_CACHE));
        return;
    }

    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});

async function cacheFirst(request, cacheName) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('[SW] Network request failed:', error);
        if (request.destination === 'image') {
            return new Response('', { status: 404 });
        }
        throw error;
    }
}

async function networkFirst(request, cacheName) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('[SW] Network failed, trying cache:', request.url);
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        if (request.destination === 'document') {
            const homePage = await caches.match('/');
            if (homePage) {
                return homePage;
            }
        }

        throw error;
    }
}

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
