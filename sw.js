self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'reply') {
    // Buka halaman dan fokus ke input
    clients.openWindow('/');
  } else {
    clients.openWindow(event.notification.data.url);
  }
});