let cacheName = 'restaurant-cache-v1';
let cache;

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache) {
            cache.addAll([
                '/',
                '/index.html',
                '/restaurant.html',
                '/css/styles.css',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/js/cache.js',
                '/js/dbhelper.js'
            ]);
        })
    );
});

let cacheName2 = 'restaurant-cache-v2';

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response;
            } else {
                //if there was no caches
                return fetch(event.request)
                .then(function(res) {
                    return caches.open(cacheName2)
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

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
        .then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName && key !== cacheName2) {
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});