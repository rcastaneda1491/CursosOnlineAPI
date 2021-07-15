const formulario = document.querySelector('#formulario');

const nombresInput = document.querySelector('#nombres');
const apellidosInput = document.querySelector('#apellidos');
const correoInput = document.querySelector('#correo');
const telefonoInput = document.querySelector('#telefono');
const nitInput = document.querySelector('#nit');
const claveInput = document.querySelector('#clave');
const rolInput = document.querySelector('#rol');

const nivelEstudiosInput = document.querySelector('#nivelEstudios');
const certificacionesInput = document.querySelector('#certificaciones');
const experienciaLaboralInput = document.querySelector('#experienciaLaboral');

const nombreBancoInput = document.querySelector('#nombreBanco');
const nombreCuentaInput = document.querySelector('#nombreCuenta');
const tipoDeCuentaInput = document.querySelector('#tipoDeCuenta');
const noCuentaInput = document.querySelector('#noCuenta');

const btnActualizar = document.querySelector('#boton-Actualizar');

let estadoActualizar = 0;
let IdUsuarioObtenido;
let estadoDatosInstuctor;

window.onload = () => {
    formulario.addEventListener('submit', validarDatos);

    cargarDatos();
}

function validarDatos(){
    console.log('Validando datos')
}

function cargarDatos(){
    const idInstructor = 1;

    const url = `https://localhost:44328/api/Instructor?idInstructor=${idInstructor}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarDatos(resultado);
        })
}

function mostrarDatos(datos){

    datos.forEach( instructor => {
        const { idUsuario, nombres, apellidos, correo, noTelefono, nit, clave, rol, idDatosInstructor } = instructor;

        for(i=0; ele=formulario.elements[i]; i++){
            ele.disabled=true;
        }
        IdUsuarioObtenido = idUsuario;
        estadoDatosInstuctor = idDatosInstructor;

        nombresInput.value = nombres;
        apellidosInput.value = apellidos;
        correoInput.value = correo;
        telefonoInput.value = noTelefono;
        nitInput.value = nit;
        claveInput.value = clave;
        telefonoInput.value = noTelefono;
        rolInput.value = rol;
    })

    if(estadoDatosInstuctor === null){
        
    }else{
        cargarDatosInstructor(IdUsuarioObtenido);
    }

    
}

function cargarDatosInstructor(id){
    const url = `https://localhost:44328/api/DatosInstructor?idInstructor=${id}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarDatosInstructor(resultado);
            console.log(resultado)
        })
}

function mostrarDatosInstructor(datos){

    datos.forEach( instructorDatos => {

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

function actualizarInformacion(){
    if(estadoActualizar === 0){
        for(i=0; ele=formulario.elements[i]; i++){
            ele.disabled=false;
        }

        estadoActualizar = 1;

        btnActualizar.textContent = "Confirmar Cambios";
        
        btnActualizar.classList.remove('btn-warning');

        btnActualizar.classList.add('btn-success');

    }else{

        if(nombresInput.value === '' || apellidosInput.value === '' || correoInput.value === '' || telefonoInput.value === '' || 
        nitInput.value === '' || claveInput.value === '' || nivelEstudiosInput.value === '' || certificacionesInput.value === '' || 
        experienciaLaboralInput.value === '' || nombreBancoInput.value === '' || nombreCuentaInput.value === '' || 
        tipoDeCuentaInput.value === '' || noCuentaInput.value === ''){

            alert("Por favor, ingrese todos los datos");

            /*for(i=0; ele=formulario.elements[i]; i++){

                if(ele.value == ''){
                    ele.classList.add('AlertaCampoVacio');
                }
            }*/


        }else{
            const urlActualizarUsuario = `https://localhost:44328/api/Instructor?idInstructor=${IdUsuarioObtenido}&nombres=${nombresInput.value}&apellidos=${apellidosInput.value}&correo=${correoInput.value}&telefono=${telefonoInput.value}&nit=${nitInput.value}&clave=${claveInput.value}`;

            fetch(urlActualizarUsuario , { method: 'PUT'})
                .then(respuesta => respuesta)
                .then(resultado => {
            })
    
            if(estadoDatosInstuctor == null){
                // Metodo POST Para agregar datos del Instructor
                const urlActualizarDatosInstructor = `https://localhost:44328/api/DatosInstructor?IdDatos=${IdUsuarioObtenido}&NivelEstudios=${nivelEstudiosInput.value}&Certificaciones=${certificacionesInput.value}&ExperienciaLaboral=${experienciaLaboralInput.value}&NombreBanco=${nombreBancoInput.value}&NombreCuenta=${nombreCuentaInput.value}&TipoDeCuenta=${tipoDeCuentaInput.value}&NoCuentaBancaria=${noCuentaInput.value}`;
    
                fetch(urlActualizarDatosInstructor , { method: 'POST'})
                .then(respuesta => respuesta)
                .then(resultado => {
                    alert("Datos Actualizados Correctamente")
                })
            }else{
                // Metodo POST para actualizar datos del Instructor
                const urlActualizarDatosInstructor = `https://localhost:44328/api/DatosInstructor?IdDatos=${IdUsuarioObtenido}&NivelEstudios=${nivelEstudiosInput.value}&Certificaciones=${certificacionesInput.value}&ExperienciaLaboral=${experienciaLaboralInput.value}&NombreBanco=${nombreBancoInput.value}&NombreCuenta=${nombreCuentaInput.value}&TipoDeCuenta=${tipoDeCuentaInput.value}&NoCuentaBancaria=${noCuentaInput.value}`;
    
                fetch(urlActualizarDatosInstructor , { method: 'PUT'})
                .then(respuesta => respuesta)
                .then(resultado => {
                    alert("Datos Actualizados Correctamente")
                })
            }
    
            for(i=0; ele=formulario.elements[i]; i++){
                ele.disabled=true;
            }
    
            estadoActualizar = 0;
    
            btnActualizar.textContent = "Actualizar Información";
            
            btnActualizar.classList.remove('btn-success');
            btnActualizar.classList.add('btn-warning');
        }
    } 
}