// Service Worker v1.0.1
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(clients.claim());
});

self.addEventListener("push", (event) => {
  console.log("Push event received:", event);

  if (!event.data) {
    console.log("Push event has no data");
    return;
  }

  try {
    const data = event.data.json();
    const { title, body, icon, badge, url, data: customData } = data;

    const options = {
      body: body || "New notification",
      icon: icon || "/icon-192x192.png",
      badge: badge || "/badge-72x72.png",
      data: {
        url: url || "/",
        ...customData,
      },
      vibrate: [200, 100, 200],
      tag: "notification-" + Date.now(),
      requireInteraction: false,
    };

    event.waitUntil(
      self.registration.showNotification(title || "Notification", options)
    );
  } catch (error) {
    console.error("Error showing notification:", error);
  }
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked:", event);

  event.notification.close();

  const urlToOpen = event.notification.data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // Check if there's already a window open with this URL
        for (const client of clientList) {
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }

        // If no window is open, open a new one
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
