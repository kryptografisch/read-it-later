// Replaced with the commit hash by the deploy workflow, so every deploy gets a fresh cache
const cacheName = "ril-__CACHE_VERSION__";

self.addEventListener("install", (event) => {
  // Kick out the old service worker
  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        "./",
        "index.html",
        "main.js",
        "manifest.json",
        "styles.css",
        "images/android-chrome-192x192.png",
        "images/android-chrome-512x512.png",
        "images/apple-touch-icon.png",
        "images/maskable_icon.png",
        "images/favicon-16x16.png",
        "images/favicon-32x32.png",
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  // Delete any non-current cache and take control of open pages right away
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Network first: updates deployed to GitHub Pages are used on the next launch.
// The cache is only a fallback when the device is offline.
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Don't cache share URLs (?title=...&url=...), only the plain files
        if (response.ok && !url.search) {
          const copy = response.clone();
          caches.open(cacheName).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request, { ignoreSearch: true }))
  );
});
