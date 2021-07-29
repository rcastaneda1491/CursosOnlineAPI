const formulario = document.querySelector('#formulario');

const nombresInput = document.querySelector('#nombres');
const apellidosInput = document.querySelector('#apellidos');
const correoInput = document.querySelector('#correo');
const telefonoInput = document.querySelector('#telefono');
const nitInput = document.querySelector('#nit');
const claveInput = document.querySelector('#clave');

const nivelEstudiosInput = document.querySelector('#nivelEstudios');
const certificacionesInput = document.querySelector('#certificaciones');
const experienciaLaboralInput = document.querySelector('#experienciaLaboral');

const nombreBancoInput = document.querySelector('#nombreBanco');
const nombreCuentaInput = document.querySelector('#nombreCuenta');
const tipoDeCuentaInput = document.querySelector('#tipoDeCuenta');
const noCuentaInput = document.querySelector('#noCuenta');

const btnActualizarPequeno = document.querySelector('#editar');
const btnActualizar = document.querySelector('#boton-Actualizar');

const alerta = document.querySelector('#alert');
const alerta2 = document.querySelector('#alert2');

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

let estadoActualizar = 0;
let IdUsuarioObtenido = jwt.sub;
let estadoDatosInstuctor;

window.onload = () => {

    if (jwt.rol != "instructor") {
        history.back();

        return;
    }
    
    formulario.addEventListener('submit', validarDatos);

    cargarDatos();

}


function CerrarSesion() {
    Cookies.remove('jwt');
};

function validarDatos() {
    console.log('Validando datos')
}

function cargarDatos() {

    const url = `https://localhost:44328/api/Instructor?idInstructor=${IdUsuarioObtenido}`;

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

    datos.forEach(instructor => {
        const { nombres, apellidos, correo, noTelefono, nit, clave, rol, idDatosInstructor } = instructor;

        for (i = 0; ele = formulario.elements[i]; i++) {
            ele.disabled = true;
        }

        estadoDatosInstuctor = idDatosInstructor;

        nombresInput.value = nombres;
        apellidosInput.value = apellidos;
        correoInput.value = correo;
        telefonoInput.value = noTelefono;
        nitInput.value = nit;
        claveInput.value = clave;
        telefonoInput.value = noTelefono;
    })

    if (estadoDatosInstuctor === null) {

    } else {
        cargarDatosInstructor(IdUsuarioObtenido);
    }


}

function cargarDatosInstructor(id) {
    const url = `https://localhost:44328/api/DatosInstructor?idInstructor=${id}`;

    fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarDatosInstructor(resultado);
            console.log(resultado)
        })
}

function mostrarDatosInstructor(datos) {

    datos.forEach(instructorDatos => {

        const { nivelEstudios, certificaciones, experienciaLaboral, nombreBanco, nombreCuenta, tipoDeCuenta, noCuentaBancaria } = instructorDatos;

        nivelEstudiosInput.value = nivelEstudios;
        certificacionesInput.value = certificaciones;
        experienciaLaboralInput.value = experienciaLaboral;
        nombreBancoInput.value = nombreBanco;
        nombreCuentaInput.value = nombreCuenta;
        tipoDeCuentaInput.value = tipoDeCuenta;
        noCuentaInput.value = noCuentaBancaria;
    })
}

function actualizarInformacion() {
    if (estadoActualizar === 0) {

        for (i = 0; ele = formulario.elements[i]; i++) {
            ele.disabled = false;
        }

        estadoActualizar = 1;

        document.getElementById('editar').style.display = 'none';
        btnActualizar.style.display = 'block';

    } else {

        if (nombresInput.value === '' || apellidosInput.value === '' || correoInput.value === '' || telefonoInput.value === '' ||
            nitInput.value === '' || claveInput.value === '' || nivelEstudiosInput.value === '' || certificacionesInput.value === '' ||
            experienciaLaboralInput.value === '' || nombreBancoInput.value === '' || nombreCuentaInput.value === '' ||
            tipoDeCuentaInput.value === '' || noCuentaInput.value === '') {

            alerta.style.display = 'block';
            alerta2.style.display = 'block';

            setTimeout(() => {
                alerta.style.display = 'none';
                alerta2.style.display = 'none';
            }, 3000);

            return;

        } else {
            const urlActualizarUsuario = `https://localhost:44328/api/Instructor?idInstructor=${IdUsuarioObtenido}&nombres=${nombresInput.value}&apellidos=${apellidosInput.value}&correo=${correoInput.value}&telefono=${telefonoInput.value}&nit=${nitInput.value}&clave=${claveInput.value}`;

            fetch(urlActualizarUsuario, {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': 'Bearer ' + stringJWT
                })
            })
                .then(respuesta => respuesta)
                .then(resultado => {
                })

            if (estadoDatosInstuctor == null) {
                // Metodo POST Para agregar datos del Instructor
                const urlActualizarDatosInstructor = `https://localhost:44328/api/DatosInstructor?IdDatos=${IdUsuarioObtenido}&NivelEstudios=${nivelEstudiosInput.value}&Certificaciones=${certificacionesInput.value}&ExperienciaLaboral=${experienciaLaboralInput.value}&NombreBanco=${nombreBancoInput.value}&NombreCuenta=${nombreCuentaInput.value}&TipoDeCuenta=${tipoDeCuentaInput.value}&NoCuentaBancaria=${noCuentaInput.value}`;

                fetch(urlActualizarDatosInstructor, {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + stringJWT
                    })
                })
                    .then(respuesta => respuesta)
                    .then(resultado => {
                        alert("Datos Actualizados Correctamente")
                    })
            } else {
                // Metodo POST para actualizar datos del Instructor
                const urlActualizarDatosInstructor = `https://localhost:44328/api/DatosInstructor?IdDatos=${IdUsuarioObtenido}&NivelEstudios=${nivelEstudiosInput.value}&Certificaciones=${certificacionesInput.value}&ExperienciaLaboral=${experienciaLaboralInput.value}&NombreBanco=${nombreBancoInput.value}&NombreCuenta=${nombreCuentaInput.value}&TipoDeCuenta=${tipoDeCuentaInput.value}&NoCuentaBancaria=${noCuentaInput.value}`;

                fetch(urlActualizarDatosInstructor, {
                    method: 'PUT',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + stringJWT
                    })
                })
                    .then(respuesta => respuesta)
                    .then(resultado => {
                        alert("Datos Actualizados Correctamente")
                    })
            }

            for (i = 0; ele = formulario.elements[i]; i++) {
                ele.disabled = true;
            }

            estadoActualizar = 0;

            btnActualizar.style.display = 'none';
            document.getElementById('editar').style.display = 'block';
            window.location.reload();
        }
    }
}