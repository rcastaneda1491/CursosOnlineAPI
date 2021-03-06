const direccion = "25.104.8.22:5001";

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

let IdUsuarioObtenido = jwt.sub;

window.onload = () => {
    if (stringJWT) {
        if (jwt.rol != "instructor") {
            history.back();
        } else {
            obtenerDatos();
        }
    } else {
        history.back();
    }
}

function obtenerDatos() {

    const url = `https://${direccion}/api/Instructor?idInstructor=${IdUsuarioObtenido}`;

    fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => {
            validar(resultado);
        })
}

const alerta = document.querySelector('#alert');
const cardaCursos = document.querySelector('#carta-cursos');
const seccionCursosNav = document.querySelector('#seccion-cursos');

function validar(instructor){

    if(instructor[0].idDatosInstructor == null){
        alerta.style.display = 'block';
        cardaCursos.classList.add("disabledbutton");
        seccionCursosNav.classList.add("disabledbutton");
    }
}




function CerrarSesion() {
    Cookies.remove('jwt');
};