export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/sw.js") {
      return new Response(`
        self.addEventListener('install', (event) => {
          self.skipWaiting();
        });
        self.addEventListener('activate', (event) => {});
        self.addEventListener('fetch', (event) => {
          event.respondWith(fetch(event.request));
        });
      `, {
        headers: { 'Content-Type': 'application/javascript' }
      });
    }

    if (url.pathname === "/manifest.json") {
      return new Response(JSON.stringify({
        name: "Kursi Hikmah",
        short_name: "Kursi",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#0275d8",
        icons: [
          {
            src: "https://yasirmaulana.github.io/my-pwa-icons/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "https://yasirmaulana.github.io/my-pwa-icons/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Proxy semua permintaan lainnya ke Bubble
    return fetch("https://kursihikmah.bubbleapps.io" + url.pathname + url.search);
  }
}
