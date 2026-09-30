document.addEventListener('DOMContentLoaded', () => {
  // --- Botón de Logout y Menú Responsive ---
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }

  const menuBtn = document.getElementById('menubtn');
  const nav = document.getElementById('sidebar');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // --- Manejo del Formulario de Especialidad (Ejercicio #24) ---
  const form = document.getElementById('specialty-form');
  const nameInput = document.getElementById('name');
  const descriptionInput = document.getElementById('description');

  const nameError = document.getElementById('name-error');
  const descriptionError = document.getElementById('description-error');
  const generalError = document.getElementById('general-error');
  const successMessage = document.getElementById('success-message');

  function limpiarErrores() {
    nameError.textContent = '';
    descriptionError.textContent = '';
    nameInput.classList.remove('input-error');
    descriptionInput.classList.remove('input-error');
    if (generalError) {
      generalError.textContent = '';
      generalError.style.display = 'none';
    }
    if (successMessage) {
      successMessage.textContent = '';
      successMessage.style.display = 'none';
    }
  }

  function validarFormulario(event) {
    event.preventDefault();
    limpiarErrores();

    const nombre = nameInput.value.trim();
    const descripcion = descriptionInput.value.trim();

    let esValido = true;
    const erroresGenerales = [];

    // Validación de Nombre: requerido, no superar 15 caracteres
    if (nombre === '') {
      nameError.textContent = 'El nombre es obligatorio.';
      nameInput.classList.add('input-error');
      erroresGenerales.push('Nombre requerido');
      esValido = false;
    } else if (nombre.length > 15) {
      nameError.textContent = 'El nombre no debe superar los 15 caracteres.';
      nameInput.classList.add('input-error');
      erroresGenerales.push('Nombre supera 15 caracteres');
      esValido = false;
    }

    // Validación de Descripción: requerida, no superar 100 caracteres
    if (descripcion === '') {
      descriptionError.textContent = 'La descripción es obligatoria.';
      descriptionInput.classList.add('input-error');
      erroresGenerales.push('Descripción requerida');
      esValido = false;
    } else if (descripcion.length > 100) {
      descriptionError.textContent = 'La descripción no debe superar los 100 caracteres.';
      descriptionInput.classList.add('input-error');
      erroresGenerales.push('Descripción supera 100 caracteres');
      esValido = false;
    }

    // Si hay errores, mostrarlos
    if (!esValido) {
      if (generalError) {
        generalError.textContent = 'Por favor, corrija los siguientes errores: ' + erroresGenerales.join(', ');
        generalError.style.display = 'block';
      }
      return;
    }

    // Si es válido: crear el objeto y mostrarlo por consola
    const nuevaEspecialidad = {
      name: nombre,
      description: descripcion
    };

    console.log('--- Nueva Especialidad Creada ---');
    console.log(nuevaEspecialidad);

    // Mensaje de confirmación visual y reseteo
    if (successMessage) {
      successMessage.textContent = `¡Especialidad "${nombre}" registrada correctamente! (Revisar objeto en la consola del navegador)`;
      successMessage.style.display = 'block';
    }

    form.reset();
  }

  form.addEventListener('submit', validarFormulario);
});
