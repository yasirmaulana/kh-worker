addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return new Response(`
    self.addEventListener('install', (event) => {
      console.log('[ServiceWorker] Installed');
      self.skipWaiting();
    });

    self.addEventListener('activate', (event) => {
      console.log('[ServiceWorker] Activated');
    });

    self.addEventListener('fetch', (event) => {
      event.respondWith(fetch(event.request));
    });
  `, {
    headers: {
      'content-type': 'application/javascript'
    }
  });
}
