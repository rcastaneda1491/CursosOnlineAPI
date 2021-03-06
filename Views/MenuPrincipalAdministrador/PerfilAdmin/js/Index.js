/* 
    Desarrollador: Rogelio Raúl Castañeda Flores
*/

const direccion = "25.104.8.22:5001";

const formulario = document.querySelector('#formulario');
const nombresInput = document.querySelector('#nombres');
const apellidosInput = document.querySelector('#apellidos');
const correoInput = document.querySelector('#correo');
const telefonoInput = document.querySelector('#telefono');
const nitInput = document.querySelector('#nit');
const contraInput = document.querySelector('#clave');


const noTarjetaInput = document.querySelector('#noTarjeta');

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

let IdUsuario;

window.onload = () => {
    if(stringJWT){
        if (jwt.rol != "administrador") {
            history.back();
        } else {
            GetDatos();
        }
    }else{
        history.back();
    }
}

function CerrarSesion() {
    Cookies.remove('jwt');
};

function mostrar() {
    document.getElementById('boton-Actualizar').style.display = 'block';
    document.getElementById('editar').style.display = 'none';
    for (i = 0; ele = formulario.elements[i]; i++) {
        ele.disabled = false;
    }
}

function GetDatos() {
    const stringJWT = Cookies.get('jwt');
    let jwt;

    if (stringJWT) {
        jwt = parseJwt(stringJWT);
    }
    const url = `https://${direccion}/api/PerfilAdmin?idUsuario=${jwt.sub}`;

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

function mostrarDatos(datos) {

    datos.forEach(estudiante => {
        const { nombres, apellidos, correo, clave, noTelefono, nit } = estudiante;


        for (i = 0; ele = formulario.elements[i]; i++) {
            ele.disabled = true;
        }

        nombresInput.value = nombres;
        apellidosInput.value = apellidos;
        correoInput.value = correo;
        contraInput.value = clave;
        telefonoInput.value = noTelefono;
        nitInput.value = nit;

    })

}



async function actualizar() {

    const stringJWT = Cookies.get('jwt');
    let jwt;

    if (stringJWT) {
        jwt = parseJwt(stringJWT);
    }

    if (nombresInput.value === '' || apellidosInput.value === '' || correoInput.value === '' || contraInput.value === '' ||
        telefonoInput.value === '' || nitInput.value === '') {

        $(document).ready(function () {
            setTimeout(function () {
                $("#alert").fadeIn(1000);
            }, 0);

            setTimeout(function () {
                $("#alert").fadeOut(1500);
            }, 3000);
        });


    } else {

        const confirmar = confirm('¿Desea editar sus datos?');
        if (confirmar) {

            console.log("Actualizando..")
            const urlActualizarUsuario = `https://${direccion}/api/PerfilAdmin?idUsuario=${jwt.sub}&nombres=${nombresInput.value}&apellidos=${apellidosInput.value}&correo=${correoInput.value}&clave=${contraInput.value}&telefono=${telefonoInput.value}&nit=${nitInput.value}`;

            await fetch(urlActualizarUsuario, {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': 'Bearer ' + stringJWT
                })
            })
                .then(() => {
                    location.reload();
                    document.getElementById('boton-Actualizar').style.display = 'none'
                })
        } else {

            location.reload();

        }
    }
}
