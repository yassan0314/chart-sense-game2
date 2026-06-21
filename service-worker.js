const CACHE_NAME = "chart-sense-game-v6";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css?v=6",
  "./script.js?v=6",
  "./manifest.webmanifest",
  "./icon.svg",
  "./assets/notes/115936_0.jpg",
  "./assets/notes/115940_0.jpg",
  "./assets/notes/115941_0.jpg",
  "./assets/notes/115944_0.jpg",
  "./assets/notes/115946_0.jpg",
  "./assets/notes/115949_0.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
