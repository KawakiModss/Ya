// ========== SERVICE WORKER UNTUK HIROKO AI ==========
const CACHE_NAME = 'Hiroko AI';

self.addEventListener('install', function(event) {
  console.log('✅ SW: Install event');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('✅ SW: Activate event');
  event.waitUntil(clients.claim());
});

self.addEventListener('message', function(event) {
  console.log('📨 SW: Message received:', event.data);
  
  if (event.data && event.data.type === 'SW_READY') {
    console.log('✅ SW: Siap menerima notifikasi!');
  }
});

self.addEventListener('notificationclick', function(event) {
  console.log('🔔 SW: Notification clicked:', event);
  
  event.notification.close();
  
  const action = event.action;
  const urlToOpen = '/';
  
  if (action === 'reply') {
    event.waitUntil(
      clients.openWindow(urlToOpen).then(function(windowClient) {
        if (windowClient) {
          windowClient.postMessage({
            type: 'FOCUS_INPUT',
            action: 'reply'
          });
        }
      })
    );
  } else {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
    );
  }
});

console.log('🔥 HIROKO AI Service Worker Loaded!');