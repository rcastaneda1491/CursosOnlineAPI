const formulario = document.querySelector('#formulario');

const nombre = document.querySelector('#nombre');
const descripcion = document.querySelector('#descripcion');
const costoVenta = document.querySelector('#costoVenta');
const costoEstudiantes = document.querySelector('#costoEstudiantes');
const estado = document.querySelector('#estado');

const alerta = document.querySelector('#alert');

let IdUsuario = 1;

function calcularCostoVenta(){
    costoEstudiantes.value = Number(costoVenta.value) + (Number(costoVenta.value) * 0.2)
}


function validarDatos() {

    if( nombre.value === '' || descripcion.value === '' || costoVenta === '' ||
    costoEstudiantes.value === ''){

        alerta.style.display = 'block';

        setTimeout(() => {
            alerta.style.display = 'none';
        }, 3000);
        
        return;
    }

    agregarCurso();
}

function agregarCurso(){

    let estadoLetras;

    if(estado.value = 1){
        estadoLetras = true;
    }else{
        estadoLetras = false;
    }

    const urlActualizarUsuario = `https://localhost:44328/api/CursosInstructor?IdUsuario=${IdUsuario}&nombre=${nombre.value}&descripcion=${descripcion.value}&costo=${costoVenta.value}&costoVenta=${costoEstudiantes.value}&estado=${estadoLetras}`;

    fetch(urlActualizarUsuario , { method: 'POST'})
        .then(respuesta => respuesta)
        .then(resultado => {
    })

    alert('Curso Agregado Exitosamente');
    window.location.href = ('/Views/InstructoresMenuPrincipal/MisCursos/misCursos.html');
}

