document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');

  // --- Botón de Logout y Menú ---
  logoutButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });

  const menuBtn = document.getElementById('menubtn');
  const nav = document.getElementById('sidebar');

  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
});
