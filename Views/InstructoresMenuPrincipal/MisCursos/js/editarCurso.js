const formulario = document.querySelector('#formulario');

const nombreI = document.querySelector('#nombre');
const descripcionI = document.querySelector('#descripcion');
const costoVentaI = document.querySelector('#costoVenta');
const costoEstudiantesI = document.querySelector('#costoEstudiantes');
const estadoI = document.querySelector('#estado');

const alerta = document.querySelector('#alert');

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


let idCurso = getParameterByName('idCurso');
let IdUsuario = 1;

window.onload = () => {
    
    cargarDatos();

}

function cargarDatos(){
    const url = `https://localhost:44328/api/CursosInstructor?idCurso=${idCurso}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarDatos(resultado);
        })
}

function mostrarDatos(cursos){

    cursos.forEach( curso => {
        const { nombre, descripcion, costo, costoVenta, estado} = curso;

        nombreI.value = nombre;
        descripcionI.value = descripcion;
        costoVentaI.value = costo;
        costoEstudiantesI.value = costoVenta;

        if(estado == true){
            estadoI.value = 1;
        }else{
            estadoI.value = 0;
        }
    })
}

function calcularCostoVenta(){
    costoEstudiantes.value = Number(costoVenta.value) + (Number(costoVenta.value) * 0.2)
}

function validarDatos(){
    if( nombre.value === '' || descripcion.value === '' || costoVenta === '' ||
    costoEstudiantes.value === ''){

        alerta.style.display = 'block';

        setTimeout(() => {
            alerta.style.display = 'none';
        }, 3000);
        
        return;
    }

    editarCurso();
}

function editarCurso(){
    let estadoLetras;

    if(estado.value = 1){
        estadoLetras = true;
    }else{
        estadoLetras = false;
    }

    const urlActualizarUsuario = `https://localhost:44328/api/CursosInstructor?IdCurso=${idCurso}&nombre=${nombre.value}&descripcion=${descripcion.value}&costo=${costoVenta.value}&costoVenta=${costoEstudiantes.value}&estado=${estadoLetras}`;

    fetch(urlActualizarUsuario , { method: 'PUT'})
        .then(respuesta => respuesta)
        .then(resultado => {
    })

    alert('Curso Editado Exitosamente');
    window.location.href = ('/InstructoresMenuPrincipal/MisCursos/misCursos.html');
}

