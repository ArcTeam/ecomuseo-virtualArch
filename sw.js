const version = "200331.v4.1";
const cacheName = `virtualArch-${version}`;
const cacheFile = [
  './',
  './asset/bootstrap.min.js',
  './asset/hammer.min.js',
  './asset/jquery.min.js',
  './asset/lozad.min.js',
  './asset/spin.min.js',
  './cache-polyfill.js',
  './css/bootstrap.min.css',
  './css/fa.css',
  './css/main.css',
  './img/ico/favicon.ico',
  './img/ico/launcher-icon-192.png',
  './img/ico/launcher-icon-512.png',
  './img/ico/logo.jpg',
  './index.html',
  './js/event.js',
  './js/function.js',
  './js/lang.js',
  './LICENSE',
  './manifest.json',
  './sw.js'
];

self.addEventListener('install', e => {
  console.log('The service worker is being installed.');
  e.waitUntil(precache())
  // e.waitUntil(
  //   caches.open(cacheName).then(cache => {
  //     return cache.addAll(cacheFile).then(() => self.skipWaiting());
  //   })
  // );
});

function precache() {
  return caches.open(cacheName).then(function (cache) {
    return cache.addAll(cacheFile);
  });
}

self.addEventListener('activate', event => {
  console.log('Activating new service worker...');
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(oldCache => {
          if (cacheWhitelist.indexOf(oldCache) === -1) {
            return caches.delete(oldCache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('The service worker is serving the asset.');
  event.respondWith(
    fromCache(event.request)
    // caches.open(cacheName)
    //   .then(cache => cache.match(event.request, {ignoreSearch: true}))
    //   .then(response => {
    //     console.log('response ', event.request.url);
    //     return response || fetch(event.request)
    //   })
  );
  event.waitUntil(update(event.request));
});

function fromCache(request) {
  return caches.open(cacheName).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}
function update(request) {
  return caches.open(cacheName).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}
