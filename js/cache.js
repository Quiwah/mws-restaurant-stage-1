/*
 * Check if the browser supports ServiceWorkers
 */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
        //success
        console.log('ServiceWorker registration succeed : ', registration.scope);
    }).catch(function(err) {
        //failed
        console.log('ServiceWorker registration failed: ', err);
    });
}
