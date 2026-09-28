// Datos de ejemplo: todavía NO hay conexión con el backend
const doctors = [
  { name: 'Dr. James Wilson', specialty: 'Cardiología', available: true },
  { name: 'Dra. Elena Rodríguez', specialty: 'Neurología', available: true },
  { name: 'Dr. Robert Chen', specialty: 'Pediatría', available: false }
];
 
const TOTAL_DOCTORS = 124; // valor del mockup, luego vendrá del backend
 
function getInitials(name) {
  return name
    .replace(/^(Dr\.|Dra\.)\s*/, '')
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('');
}
 
function renderDoctors(list) {
  const tbody = document.getElementById('doctor-table-body');
  const count = document.getElementById('doctor-count');
 
  if (list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="empty">No se encontraron doctores con ese nombre.</td></tr>';
    count.textContent = 'Sin resultados';
    return;
  }
 
  tbody.innerHTML = list
    .map(
      (doctor) => `
        <tr>
          <td>
            <div class="doctor">
              <span class="avatar">${getInitials(doctor.name)}</span>
              ${doctor.name}
            </div>
          </td>
          <td>${doctor.specialty}</td>
          <td>
            <span class="badge ${doctor.available ? 'badge-ok' : 'badge-warn'}">
              ${doctor.available ? 'Activo' : 'De licencia'}
            </span>
          </td>
          <td></td>
        </tr>`
    )
    .join('');
 
  count.textContent = `Mostrando 1 a ${list.length} de ${TOTAL_DOCTORS} resultados`;
}


document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menubtn');
  const sidebar = document.getElementById('sidebar');
  const logoutBtn = document.getElementById('logout');
  const searchInput = document.getElementById('doctor-search');
 
  // Menú móvil: abre/cierra. En escritorio el botón está oculto por CSS.
  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
 
  // Cierra el menú al tocar fuera de él o con la tecla Escape
  document.addEventListener('click', (event) => {
    const clickedOutside = !sidebar.contains(event.target) && !menuBtn.contains(event.target);
    if (clickedOutside) sidebar.classList.remove('open');
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') sidebar.classList.remove('open');
  });
 
  logoutBtn.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
 
  // Buscador: filtra el array en memoria, sin volver a "pedir" los datos
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    renderDoctors(doctors.filter((d) => d.name.toLowerCase().includes(query)));
  });
 
  renderDoctors(doctors);
});
