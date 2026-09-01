const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const query = new URLSearchParams(window.location.search);
const hasRoomScope = Boolean(query.get('room'));

function syncPrimaryDiscoveryRoutes() {
  document.querySelectorAll('.nav-rooms-link').forEach((link) => {
    link.href = 'rooms.html';
    link.classList.toggle('active', currentPage === 'rooms.html' || (currentPage === 'products.html' && hasRoomScope));
  });

  document.querySelectorAll('.nav-shop > a').forEach((link) => {
    link.classList.toggle('active', currentPage === 'products.html' && !hasRoomScope);
  });
}

syncPrimaryDiscoveryRoutes();
