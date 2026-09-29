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
  /*const tbody = document.querySelector('#specialities-table-body');
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
  });*/
  const tbody = document.querySelector('#specialities-table-body');
  if (lista.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="empty">No se encontraron especialidades.</td></tr>';
    return;
  }
  tbody.innerHTML = lista
    .map(item => `
      <tr>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>
          <span class="badge ${item.active ? 'badge-ok' : 'badge-warn'}">
            ${item.active ? 'Activa' : 'Inactiva'}
          </span>
        </td>
        <td>
          <div class="table-actions">
            <button class= "btn-icon" data-action="edit" data-id="${item.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
              </svg>
            </button>
            <button class="btn-icon" data-action="delete" data-id="${item.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
              </svg>
            </button>
          </div>
        </td>
      </tr>`)
    .join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');
  const menuBtn = document.getElementById('menubtn');
  const sidebar = document.getElementById('sidebar');

    menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
    document.addEventListener('click', (event) => {
    const clickedOutside = !sidebar.contains(event.target) && !menuBtn.contains(event.target);
    if (clickedOutside) sidebar.classList.remove('open');
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') sidebar.classList.remove('open');
  });
 
  logoutButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
  obtenerEspecialidades();

  // --- Buscador (afuera de la función cargarTabla) ---
  const searchInput = document.getElementById('search-input');

  searchInput.addEventListener('input', () => {
    if(searchInput.value.length >= 3){
      const query = searchInput.value.toLowerCase().trim();
      const filtrados = especialidades.filter(item =>
        item.name.toLowerCase().includes(query)
      );
      cargarTabla(filtrados);
    }else if(searchInput.value.length < 3){
      cargarTabla(especialidades);
    }
  });

  // --- Botón de Logout y Menú ---




});