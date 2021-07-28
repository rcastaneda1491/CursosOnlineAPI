const formulario = document.querySelector('#formulario');
const contenedor = document.querySelector('#contenedor');

const nombre = document.querySelector('#nombre');
const descripcion = document.querySelector('#descripcion');
const costoVenta = document.querySelector('#costoVenta');
const costoEstudiantes = document.querySelector('#costoEstudiantes');
const estado = document.querySelector('#estado');

const alerta = document.querySelector('#alert');

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

let IdUsuario = jwt.sub;

function calcularCostoVenta() {
    costoEstudiantes.value = Number(costoVenta.value) + (Number(costoVenta.value) * 0.2)
}

function CerrarSesion() {
    Cookies.remove('jwt');
};


function validarDatos() {

    if (nombre.value === '' || descripcion.value === '' || costoVenta === '' ||
        costoEstudiantes.value === '') {

        alerta.style.display = 'block';

        setTimeout(() => {
            alerta.style.display = 'none';
        }, 3000);

        return;
    }

    agregarCurso();
}

async function agregarCurso() {

    let estadoLetras;

    if (estado.value == 0) {
        estadoLetras = true;
    } 
    if(estado.value == 1) {
        estadoLetras = false;
    }

    mostrarSpinner();

    const urlActualizarUsuario = `https://localhost:44328/api/CursosInstructor?IdUsuario=${IdUsuario}&nombre=${nombre.value}&descripcion=${descripcion.value}&costo=${costoVenta.value}&costoVenta=${costoEstudiantes.value}&estado=${estadoLetras}`;

    await fetch(urlActualizarUsuario, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta)
        .then(resultado => {
        })

    alert('Curso Agregado Exitosamente');
    window.location.href = ('/InstructoresMenuPrincipal/MisCursos/misCursos.html');
}

function mostrarSpinner(){

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `;

    contenedor.appendChild(spinner);
}

function eliminarSpinner(){
    const spinner = document.querySelector('.spinner');

    contenedor.removeChild(spinner);
}

