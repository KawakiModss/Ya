// ========== FILE sw.js - LETAKKAN DI ROOT FOLDER WEBSITE LO ==========
// Nama file: sw.js
// Lokasi: /sw.js (satu level dengan index.html)

self.addEventListener('install', function(event) {
  console.log('✅ Service Worker installed - HIROKO AI');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('✅ Service Worker activated - HIROKO AI');
  event.waitUntil(clients.claim());
});

// ========== PUSH NOTIFICATION HANDLER ==========
self.addEventListener('push', function(event) {
  console.log('📨 Push notification received:', event);
  
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch(e) {
      data = { title: 'HIROKO AI', body: event.data.text() };
    }
  }
  
  const title = data.title || '🤖 HIROKO AI';
  const options = {
    body: data.body || 'Ada pesan baru dari HIROKO!',
    icon: data.icon || 'https://files.catbox.moe/defcsh.jpg',
    badge: data.badge || 'https://files.catbox.moe/defcsh.jpg',
    vibrate: [200, 100, 200],
    tag: data.tag || 'hiroko-notification',
    renotify: true,
    requireInteraction: true,
    data: {
      url: data.url || '/',
      type: data.type || 'hiroko-ai',
      timestamp: Date.now()
    },
    actions: [
      {
        action: 'open',
        title: '💬 Buka HIROKO',
        icon: 'https://files.catbox.moe/defcsh.jpg'
      },
      {
        action: 'reply',
        title: '✏️ Balas',
        icon: 'https://files.catbox.moe/defcsh.jpg'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// ========== NOTIFICATION CLICK HANDLER ==========
self.addEventListener('notificationclick', function(event) {
  console.log('🔔 Notification clicked:', event);
  
  event.notification.close();
  
  const action = event.action;
  const notificationData = event.notification.data || {};
  const urlToOpen = notificationData.url || '/';
  
  if (action === 'reply') {
    // Buka halaman dan fokus ke input
    event.waitUntil(
      clients.openWindow(urlToOpen).then(function(windowClient) {
        // Kirim pesan ke page untuk fokus ke input
        if (windowClient) {
          windowClient.postMessage({
            type: 'FOCUS_INPUT',
            action: 'reply'
          });
        }
      })
    );
  } else {
    // Buka halaman biasa
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

// ========== MESSAGE HANDLER DARI PAGE ==========
self.addEventListener('message', function(event) {
  console.log('📨 Message received from page:', event.data);
  
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const title = event.data.title || '🤖 HIROKO AI';
    const options = {
      body: event.data.body || 'Ada pesan baru!',
      icon: event.data.icon || 'https://files.catbox.moe/defcsh.jpg',
      badge: event.data.badge || 'https://files.catbox.moe/defcsh.jpg',
      vibrate: [200, 100, 200],
      requireInteraction: true,
      data: {
        url: event.data.url || '/',
        type: 'hiroko-ai'
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  }
});

// ========== FETCH HANDLER (BUAT OFFLINE CACHE - OPSIONAL) ==========
self.addEventListener('fetch', function(event) {
  // Biarin default dulu, gak pake cache kompleks
  event.respondWith(fetch(event.request));
});

console.log('🔥 HIROKO AI Service Worker loaded!');