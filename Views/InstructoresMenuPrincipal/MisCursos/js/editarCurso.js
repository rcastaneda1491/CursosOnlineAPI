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

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

const stringJWT = Cookies.get('jwt');
let jwt;

if (stringJWT) {
    jwt = parseJwt(stringJWT);
}

let idCurso = getParameterByName('idCurso');
let IdUsuario = jwt.sub;

window.onload = () => {

    cargarDatos();

}

function CerrarSesion() {
    Cookies.remove('jwt');
};


function cargarDatos() {
    const url = `https://localhost:44328/api/CursosInstructor?idCurso=${idCurso}`;
    console.log(idCurso);
    fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarDatos(resultado);
        })
}

function mostrarDatos(cursos) {

    cursos.forEach(curso => {
        const { nombre, descripcion, costo, costoVenta, estado } = curso;

        nombreI.value = nombre;
        descripcionI.value = descripcion;
        costoVentaI.value = costo;
        costoEstudiantesI.value = costoVenta;

        if (estado == true) {
            estadoI.value = 0;
        } else {
            estadoI.value = 1;
        }
    })
}

function calcularCostoVenta() {
    costoEstudiantes.value = Number(costoVenta.value) + (Number(costoVenta.value) * 0.2)
}

function validarDatos() {
    if (nombre.value === '' || descripcion.value === '' || costoVenta === '' ||
        costoEstudiantes.value === '') {

        alerta.style.display = 'block';

        setTimeout(() => {
            alerta.style.display = 'none';
        }, 3000);

        return;
    }

    editarCurso();
}

async function editarCurso() {
    let estadoLetras;

    if (estadoI.value == 0) {
        estadoLetras = true;
    } 
    if(estadoI.value == 1) {
        estadoLetras = false;
    }

    const urlActualizarUsuario = `https://localhost:44328/api/CursosInstructor?IdCurso=${idCurso}&nombre=${nombreI.value}&descripcion=${descripcionI.value.toString()}&costo=${costoVentaI.value}&costoVenta=${costoEstudiantesI.value}&estado=${estadoLetras}`;

    await fetch(urlActualizarUsuario, {
        method: 'PUT',
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta)
        .then(resultado => {
        })

    alert('Curso Editado Exitosamente');
    window.location.href = ('/InstructoresMenuPrincipal/MisCursos/misCursos.html');
}

