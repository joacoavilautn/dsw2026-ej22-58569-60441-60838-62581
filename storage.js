let specialties = [];

function obtenerEspecialidades(){
    const data = localStorage.getItem('specialties');
    specialties = data ? JSON.parse(data) : [];
    return specialties;
}

function guardarEspecialidades(lista){
    localStorage.setItem('specialties',
        JSON.stringify(lista));
}