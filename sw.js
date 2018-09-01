let cacheName = 'restaurant-cache-v1';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache) {
            const watchingUrl = [
                '/',
                '/index.html',
                '/restaurant.html',
                '/css/styles.css',
                'js/main.js',
                'js/restaurant_info.js',
                'js/cache.js',
                'js/dbhelper.js'
            ];
            return cache.addAll(watchingUrl);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request)
                .then(function(res) {
                    return caches.open(cacheName)
                    .then(function(cache) {
                        cache.put(event.request.url, res.clone());
                        return res;
        })
    })
    .catch(function() {
        //for errors
    });
}
        })
    );
});