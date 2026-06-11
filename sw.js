var CACHE_VERSION = 'trainsr-v5';
var FILES = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/app.js',
  './assets/goblet.jpg',
  './assets/bench.jpg',
  './assets/rdl.jpg',
  './assets/row.jpg',
  './assets/shoulder.jpg',
  './assets/lat.jpg',
  './assets/lunge.jpg',
  './assets/reverse_fly.jpg',
  './assets/plank.jpg',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_VERSION).then(function(c) { return c.addAll(FILES); })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_VERSION; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  // network-first for navigation, cache-first for assets
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(function() { return caches.match('./index.html'); })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(r) { return r || fetch(e.request); })
    );
  }
});
