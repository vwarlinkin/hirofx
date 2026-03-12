// ═══════════════════════════════════════════════════════════
// TRADERQUEST — SERVICE WORKER
// Bump CACHE_VERSION chaque fois que tu pousses une mise à jour
// ═══════════════════════════════════════════════════════════

const CACHE_VERSION = 'tq-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Share+Tech+Mono&display=swap'
];

// ── INSTALL : mise en cache initiale ──
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()) // Active immédiatement le nouveau SW
  );
});

// ── ACTIVATE : supprime les anciens caches ──
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_VERSION)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH : Network-first avec fallback cache ──
// → Tente toujours le réseau en premier pour avoir la dernière version
// → Si offline, sert depuis le cache
self.addEventListener('fetch', e => {
  // Ignore les requêtes non-GET
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Mise à jour du cache avec la version fraîche
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(e.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Offline → fallback cache
        return caches.match(e.request)
          .then(cached => cached || caches.match('./index.html'));
      })
  );
});
