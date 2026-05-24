// ========== SERVICE WORKER UNTUK HIROKO AI DENGAN REPLY ACTION ==========
const CACHE_NAME = 'Hiroko AI';

self.addEventListener('install', (event) => {
  console.log('✅ SW: Installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('✅ SW: Activating...');
  event.waitUntil(clients.claim());
});

// ========== PUSH NOTIFICATION + REPLY ACTION ==========
self.addEventListener('push', (event) => {
  console.log('📨 SW: Push received:', event);
  
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch(e) {
      data = { title: 'HIROKO AI', body: event.data.text() };
    }
  }
  
  const title = data.title || 'HIROKO AI';
  const options = {
    body: data.body || 'Ada pesan baru!',
    icon: data.icon || 'https://files.catbox.moe/defcsh.jpg',
    badge: data.badge || 'https://files.catbox.moe/defcsh.jpg',
    vibrate: [200, 100, 200],
    tag: 'hiroko-' + Date.now(),
    renotify: true,
    requireInteraction: true,
    data: {
      url: data.url || '/',
      type: 'hiroko-ai',
      timestamp: Date.now(),
      questionId: data.questionId || Date.now()
    },
    // INI YANG PENTING - TOMBOL REPLY LANGSUNG!
    actions: [
      {
        action: 'reply',
        title: ' Balas',
        icon: 'https://files.catbox.moe/defcsh.jpg'
      },
      {
        action: 'open',
        title: ' Buka HIROKO',
        icon: 'https://files.catbox.moe/defcsh.jpg'
      }
    ]
  };
  
  event.waitUntil(self.registration.showNotification(title, options));
});

// ========== HANDLE KLIK NOTIFIKASI (TERMASUK REPLY) ==========
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 SW: Notification clicked:', event);
  console.log('🔔 Action:', event.action);
  
  event.notification.close();
  
  const notificationData = event.notification.data || {};
  const urlToOpen = notificationData.url || '/';
  
  // KALO USER KLIK "REPLY"
  if (event.action === 'reply') {
    // BUKA WINDOW BARU DENGAN PARAMETER KHUSUS
    event.waitUntil(
      clients.openWindow(urlToOpen + '?mode=reply&questionId=' + (notificationData.questionId || Date.now()))
        .then((windowClient) => {
          // KIRIM PESAN KE PAGE BIAR FOKUS KE INPUT
          if (windowClient) {
            windowClient.postMessage({
              type: 'FOCUS_INPUT',
              action: 'reply',
              questionId: notificationData.questionId
            });
          }
        })
    );
  } 
  else {
    // KLIK BIASA - BUKA PAGE
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((clientList) => {
          for (const client of clientList) {
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

// ========== HANDLE MESSAGE DARI PAGE ==========
self.addEventListener('message', (event) => {
  console.log('📨 SW: Message from page:', event.data);
  
  if (event.data && event.data.type === 'SEND_NOTIFICATION') {
    event.waitUntil(
      self.registration.showNotification(event.data.title, {
        body: event.data.body,
        icon: event.data.icon,
        badge: event.data.badge,
        vibrate: [200, 100, 200],
        tag: 'hiroko-' + Date.now(),
        renotify: true,
        requireInteraction: true,
        data: { url: event.data.url || '/', type: 'hiroko-ai' },
        actions: [
          { action: 'reply', title: ' Balas', icon: event.data.icon },
          { action: 'open', title: ' Buka HIROKO', icon: event.data.icon }
        ]
      })
    );
  }
});

console.log('🔥 HIROKO AI Service Worker v2 Loaded!');