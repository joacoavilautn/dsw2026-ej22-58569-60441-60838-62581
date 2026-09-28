let especialidades = [];

function obtenerEspecialidades() {
    fetch('specialties.json')
      .then(response => response.json())
      .then(data => {
        especialidades = data;
        cargarTabla(especialidades);
      })
      .catch(error => {
        console.log('Error:', error);
        alert('Error al obtener las especialidades');
      });
  }

function cargarTabla(lista) {
  const tbody = document.querySelector('#product-table-body');
  tbody.innerHTML = '';

  lista.forEach(item => {
    const tr = document.createElement('tr');
    const tdNombre = document.createElement('td');
    tdNombre.textContent = item.name;

    const tdDescripcion = document.createElement('td');
    tdDescripcion.textContent = item.description;

    tr.appendChild(tdNombre);
    tr.appendChild(tdDescripcion);
    tbody.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');

  obtenerEspecialidades();
  
  // --- Buscador (afuera de la función cargarTabla) ---
  const searchBtn = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-input');

  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase().trim();
    const filtrados = especialidades.filter(item =>
      item.name.toLowerCase().includes(query)
    );
    cargarTabla(filtrados);
  });

  searchInput.addEventListener('keydown', () => {
    if(searchInput.value.length >= 2){
      const query = searchInput.value.toLowerCase().trim();
      const filtrados = especialidades.filter(item =>
        item.name.toLowerCase().includes(query)
      );
      cargarTabla(filtrados);
    }else if(searchInput.value.length < 2){
      obtenerEspecialidades();
    }
  });

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