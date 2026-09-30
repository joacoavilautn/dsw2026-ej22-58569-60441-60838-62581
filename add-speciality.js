document.addEventListener('DOMContentLoaded', () => {
  
  const menuBtn = document.getElementById('menubtn');
  const sidebar = document.getElementById('sidebar');
  const logoutButton = document.getElementById('logout');

  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  logoutButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });

 
  document.getElementById('cancel-btn').addEventListener('click', () => {
    window.location.href = 'specialities.html';
  });

  document.getElementById('specialty-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = document.getElementById('input-nombre').value.trim();
    const descripcion = document.getElementById('input-descripcion').value.trim();
    const errorNombre = document.getElementById('error-nombre');
    const errorDescripcion = document.getElementById('error-descripcion');

    
    errorNombre.textContent = '';
    errorDescripcion.textContent = '';

    let valido = true;

    
    if (nombre === '') {
      errorNombre.textContent = 'El nombre es requerido.';
      valido = false;
    } else if (nombre.length > 15) {
      errorNombre.textContent = 'El nombre no puede superar los 15 caracteres.';
      valido = false;
    }

    if (descripcion === '') {
      errorDescripcion.textContent = 'La descripción es requerida.';
      valido = false;
    } else if (descripcion.length > 100) {
      errorDescripcion.textContent = 'La descripción no puede superar los 100 caracteres.';
      valido = false;
    }

    if (valido) {
      const lista = obtenerEspecialidades();
     
      const nuevaEspecialidad = {
        id: crypto.randomUUID(),
        name: nombre,
        description: descripcion,
        active: true
      };

      lista.push(nuevaEspecialidad);
      guardarEspecialidades(lista);

      alert('Especialidad guardada con éxito!');
      window.location.href = 'specialities.html';
    }
  });
});