/* 
    Desarrollador: Rogelio Raúl Castañeda Flores
*/

const submitButton = document.getElementById("submitButton");
const form = document.getElementById("form");
const correoInput = document.getElementById("inputEmail");
const passwordInput = document.getElementById("inputPassword");
const nombresInput = document.getElementById("inputNames");
const apellidosInput = document.getElementById("inputSurname");
const telefonoInput = document.getElementById("inputPhone");
const nitInput = document.getElementById("inputNIT");
const rolInput = document.getElementById("rolInput");
const loginButton = document.getElementById("loginButton");

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

window.onload = () => {
    if(stringJWT){
        if (jwt.rol != "administrador") {
            history.back();
        }
    }else{
        history.back();
    }
}

function validarDatos() {

    if (nombresInput.value != "" && 
        apellidosInput.value != "" &&
        correoInput.value != "" &&
        telefonoInput.value != "" &&
        nitInput.value != "" &&
        passwordInput.value != ""
    ) {
        crearUsuario();
    } else {
        alert("Todos los datos son necesarios");
    }
}

function crearUsuario() {
    const urlCrearUsuario = `https://${direccion}/api/Usuarios?Nombres=${nombresInput.value}&Apellidos=${apellidosInput.value}&Correo=${correoInput.value}&NoTelefono=${telefonoInput.value}&Nit=${nitInput.value}&Clave=${passwordInput.value}&Rol=administrador`;

    fetch(urlCrearUsuario, { method: 'POST' })
        .then(respuesta => respuesta)

    alert('Usuario Agregado Exitosamente');

}