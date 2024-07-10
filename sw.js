const CACHE_NAME = "version-1";
const urlstoCache = ["index.html", "offline.html", "style.css", "script.js"];
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opend Cache");
      return cache.addAll(urlstoCache);
    })
  );
});

this.addEventListener("activate", (event) => {
  const cacheWhiteList = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
  console.log(`Intercepting fetch request for: ${event.request.url}`);
});
