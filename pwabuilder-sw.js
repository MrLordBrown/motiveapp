// This is the service worker with the Cache-first network

const CACHE = "pwabuilder-precache";
const precacheFiles = [
    "/01Boarding.mp3",
    "/02NightTrain.mp3",
    "/03JAvenueSubject.mp3",
    "/04Keiko.mp3",
    "/05JekyllChorus.mp3",
    "/06ArrangedForErasure.mp3",
    "/07CarToCar.mp3",
    "/08WarningWickedFool.mp3",
    "/09NextEndLine.mp3",
    "/10Deboarding.mp3",
    "/android-chrome-192x192.png",
    "/android-chrome-512x512.png",
    "/apple-touch-icon.png",
    "/arranged.png",
    "/background.png",
    "/boarding.png",
    "/browserconfig.xml",
    "/cartocar.png",
    "/deboarding.png",
    "/erasure.png",
    "/favicon-16x16.png",
    "/favicon-32x32.png",
    "/favicon.ico",
    "/index.html",
    "/jave.png",
    "/jekyllthing.png",
    "/keiko.png",
    "/manifest.json",
    "/mstile-150x150.png",
    "/next.png",
    "/nighttrain.png",
    "/pause.png",
    "/play-button.png",
    "/play.png",
    "/pwabuilder-sw.js",
    "/pwabuilder-sw-register.js",
    "/robots.txt",
    "/safari-pinned-tab.svg",
    "/warningshell.png",
    "/512/arranged.png",
    "/512/background.png",
    "/512/boarding.png",
    "/512/cartocar.png",
    "/512/deboarding.png",
    "/512/erasure.png",
    "/512/jave.png",
    "/512/jekyllthing.png",
    "/512/keiko.png",
    "/512/next.png",
    "/512/nighttrain.png",
    "/512/warningshell.png",
    "/1024/arranged.png",
    "/1024/background.png",
    "/1024/boarding.png",
    "/1024/cartocar.png",
    "/1024/deboarding.png",
    "/1024/erasure.png",
    "/1024/jave.png",
    "/1024/jekyllthing.png",
    "/1024/keiko.png",
    "/1024/next.png",
    "/1024/nighttrain.png",
    "/1024/warningshell.png",
    "/1536/arranged.png",
    "/1536/background.png",
    "/1536/boarding.png",
    "/1536/cartocar.png",
    "/1536/deboarding.png",
    "/1536/erasure.png",
    "/1536/jave.png",
    "/1536/jekyllthing.png",
    "/1536/keiko.png",
    "/1536/next.png",
    "/1536/nighttrain.png",
    "/1536/warningshell.png"
];

self.addEventListener("install", function (event) {
  console.log("[PWA Builder] Install Event processing");

  console.log("[PWA Builder] Skip waiting on install");
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      console.log("[PWA Builder] Caching pages during install");
      return cache.addAll(precacheFiles);
    })
  );
});

// Allow sw to control of current page
self.addEventListener("activate", function (event) {
  console.log("[PWA Builder] Claiming clients for current page");
  event.waitUntil(self.clients.claim());
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", function (event) { 
  if (event.request.method !== "GET") return;

  event.respondWith(
    fromCache(event.request).then(
      function (response) {
        // The response was found in the cache so we responde with it and update the entry

        // This is where we call the server to get the newest version of the
        // file to use the next time we show view
        event.waitUntil(
          fetch(event.request).then(function (response) {
            return updateCache(event.request, response);
          })
        );

        return response;
      },
      function () {
        // The response was not found in the cache so we look for it on the server
        return fetch(event.request)
          .then(function (response) {
            // If request was success, add or update it in the cache
            event.waitUntil(updateCache(event.request, response.clone()));

            return response;
          })
          .catch(function (error) {
            console.log("[PWA Builder] Network request failed and no cache." + error);
          });
      }
    )
  );
});

function fromCache(request) {
  // Check to see if you have it in the cache
  // Return response
  // If not in the cache, then return
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        return Promise.reject("no-match");
      }

      return matching;
    });
  });
}

function updateCache(request, response) {
  return caches.open(CACHE).then(function (cache) {
    return cache.put(request, response);
  });
}
