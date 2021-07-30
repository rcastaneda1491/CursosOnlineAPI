const direccion = "25.104.8.22:5001";

const formulario = document.querySelector('#formulario');

const titulo = document.querySelector('#titulo');
const descripcion = document.querySelector('#descripcion');
const enlace = document.querySelector('#enlace');
const alerta = document.querySelector('#alert');
const alerta2 = document.querySelector('#alert2');

let minutos;

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

function getCodigoVideo(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(enlace.value);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

const stringJWT = Cookies.get('jwt');

let jwt;

if (stringJWT) {
    jwt = parseJwt(stringJWT);
}

let idCurso = getParameterByName('idCurso');

window.onload = () => {
    if (stringJWT) {
        if (jwt.rol != "instructor") {
            history.back();
        }
    } else {
        history.back();
    }
}

let idUsuarioObtenido = jwt.sub;

function CerrarSesion() {
    Cookies.remove('jwt');
};

function validarDatos() {

    if (titulo.value === '' || descripcion.value === '' || enlace.value === '') 
    {
        alerta.style.display = 'block';

        setTimeout(() => {
            alerta.style.display = 'none';
        }, 3000);

        return;
    }

    agregarLeccion();
}

async function agregarLeccion() {
    mostrarSpinner();

    let codigoVideo = getCodigoVideo('v');

    if(codigoVideo == ''){
        alerta2.style.display = 'block';

        setTimeout(() => {
            alerta2.style.display = 'none';
        }, 3000);

        eliminarSpinner();
        
        return;
    }

    const urlAPIYoutube = `https://www.googleapis.com/youtube/v3/videos?part=id%2C+contentDetails&id=${codigoVideo}&key=AIzaSyCVG1tPl8u2qfaz3urWzF4db-lCC3OQGmo`;

    await fetch(urlAPIYoutube)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            obtenerDatosVideo(resultado.items);
        });

    const url = `https://${direccion}/api/LeccionesInstructor?idCurso=${idCurso}&titulo=${titulo.value}&descripcion=${descripcion.value}&duracion=${minutos}&enlace=${codigoVideo}`;

    await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta)
        .then(resultado => {
        })

    alert('Agregado Exitosamente');
    window.location.href = (`/InstructoresMenuPrincipal/Lecciones/lecciones.html?idCurso=${idCurso}`);
}

function obtenerDatosVideo(video){

    video.forEach(datos => {
        
        duracion = datos.contentDetails.duration;

        console.log(duracion)

        let duracionSeparada = duracion.split("PT");
        let duracionSeparadaMinutos = duracionSeparada[1].split("M");

        minutos = Number(duracionSeparadaMinutos[0]);        
    })
}

function mostrarSpinner(){

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `;

    formulario.appendChild(spinner);
}

function eliminarSpinner(){
    const spinner = document.querySelector('.spinner');

    formulario.removeChild(spinner);
}