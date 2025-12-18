// Service Worker v1.0.4
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
    var title = data.title;
    var body = data.body;
    var icon = data.icon;
    var badge = data.badge;
    var url = data.url;
    var customData = data.data;

    var options = {
      body: body || "New notification",
      icon: icon || "/icon-192x192.png",
      badge: badge || "/badge-72x72.png",
      data: Object.assign({ url: url || "/" }, customData),
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
          var client = clientList[i];
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow(urlToOpen);
        }
      })
  );
});
