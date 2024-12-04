self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-pemasukanpengeluaran').then((cache) => {
            return cache.addAll([
                'https://alifarsum.github.io/pemasukanpengeluaran.github.io/index.html',
                // Tambahkan file lainnya yang ingin dicache
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['my-pemasukanpengeluaran'];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
