/* console-ninja:disable */
// Service Worker v1.0.6
self.addEventListener("install", function (event) {
  console.log("Service Worker installing...");
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  console.log("Service Worker activating...");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", function (event) {
  console.log("Push event received:", event);
  if (!event.data) {
    console.log("Push event has no data");
    return;
  }
  try {
    var data = event.data.json();
    var options = {
      body: data.body || "New notification",
      icon: data.icon || "/icon-192x192.png",
      badge: data.badge || "/badge-72x72.png",
      data: Object.assign({ url: data.url || "/" }, data.data),
      vibrate: [200, 100, 200],
      tag: "notification-" + Date.now(),
      requireInteraction: false,
    };
    event.waitUntil(
      self.registration.showNotification(data.title || "Notification", options)
    );
  } catch (error) {
    console.error("Error showing notification:", error);
  }
});

self.addEventListener("notificationclick", function (event) {
  console.log("Notification clicked:", event);
  event.notification.close();
  var urlToOpen =
    (event.notification.data && event.notification.data.url) || "/";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          if (clientList[i].url === urlToOpen && "focus" in clientList[i]) {
            return clientList[i].focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow(urlToOpen);
        }
      })
  );
});
