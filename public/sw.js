/* console-ninja:disable */
// Service Worker v1.0.8 - Minimal bulletproof version
self.addEventListener("install", function (e) {
  console.log("SW installing");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("SW activating");
  e.waitUntil(self.clients.claim());
});

self.addEventListener("push", function (e) {
  if (!e.data) return;
  var d = e.data.json();
  e.waitUntil(
    self.registration.showNotification(d.title || "Notification", {
      body: d.body || "New notification",
      icon: d.icon || "/icon.svg",
      badge: d.badge || "/icon.svg",
      data: { url: d.url || "/" },
      vibrate: [200, 100, 200],
    })
  );
});

self.addEventListener("notificationclick", function (e) {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || "/";
  e.waitUntil(
    self.clients.matchAll({ type: "window" }).then(function (list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].url === url) return list[i].focus();
      }
      return self.clients.openWindow(url);
    })
  );
});
