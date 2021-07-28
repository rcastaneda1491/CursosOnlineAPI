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

function validarDatos() {

    if (nombresInput.value != "" && 
        rolInput.value != "" &&
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
    const urlCrearUsuario = `https://localhost:44328/api/Usuarios?Nombres=${nombresInput.value}&Apellidos=${apellidosInput.value}&Correo=${correoInput.value}&NoTelefono=${telefonoInput.value}&Nit=${nitInput.value}&Clave=${passwordInput.value}&Rol=${rolInput.value}`;

    fetch(urlCrearUsuario, { method: 'POST' })
        .then(respuesta => respuesta)

    alert('Usuario Agregado Exitosamente');
}
