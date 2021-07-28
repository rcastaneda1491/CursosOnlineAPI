function CerrarSesion() {
    Cookies.remove('jwt');
};

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

const stringJWT = Cookies.get('jwt');

let jwt;

if (stringJWT) {
    jwt = parseJwt(stringJWT);
}

let idCurso = getParameterByName('idCurso');
let idUsuarioObtenido = jwt.sub;

let leccionEnProceso;

const mostrar = document.querySelector('#listado');
const mostrarComentarios = document.querySelector('#comentarios');
const contenedorVideo = document.querySelector('#contenedorVideo');

const alerta = document.querySelector('#alert');

const titulocurso = document.querySelector('#titulo');


window.onload = () => {
    obtenerLecciones();
    GetTitulo();
}

async function GetTitulo(){
    const url = `https://localhost:44328/api/DatosCurso?IdCurso=${idCurso}`;

    await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrartitulo(resultado);
        })
}

function mostrartitulo(datos) {
    

    datos.forEach(curso => {
        const { idCurso, nombre, descripcion, duracion, costo, costoVenta, cantidadEstudiante,estado,idUsuario } = curso;

        titulocurso.innerHTML += `
            <h1>${nombre}</h1>
            <h5>${descripcion}</h5>
        `;
    })
}


function mostrartitulo(datos) {
    

    datos.forEach(curso => {
        const { idCurso, nombre, descripcion, duracion, costo, costoVenta, cantidadEstudiante,estado,idUsuario } = curso;

        titulocurso.innerHTML += `
            <h1>${nombre}</h1>
            <h5>${descripcion}</h5>
        `;
    })
}

function agregarLeccion(){
    window.location.href = `/InstructoresMenuPrincipal/Lecciones/crearLeccion.html?idCurso=${idCurso}`;
}

async function obtenerLecciones(){

    mostrarSpinner();

    const url = `https://localhost:44328/api/LeccionesInstructor?idCurso=${idCurso}`;

    await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
    .then(respuesta => respuesta.json())
    .then(resultado => {
        mostrarLecciones(resultado);
    })

    eliminarSpinner();
}

function mostrarLecciones(lecciones) {

    lecciones.forEach(leccion => {
        const { idLeccion, idCurso, titulo, descripcion, duracion, enlace } = leccion;

        mostrar.innerHTML += `
            <div class="card" style="border-radius: 0px; background-color: #fff; id="leccion">
                <div class="card-body">
                  <h5 class="card-title">${titulo}</h5>
                  <center><p class="card-text">${descripcion} | Duración: ${duracion} minutos</p>
                  <button onclick="visualizarVideoComentarios('${enlace}',${idLeccion});" class="btn" style="background-color: #4F73CF; color:white;">Visualizar</button>
                  <a href="./editarLeccion.html?idCurso=${idCurso}&idLeccion=${idLeccion}" class="btn" style="background-color:#FFDE59;">Editar</a>
                  <button class="btn btn-danger" onclick="confimarEliminar(${idLeccion});">Eliminar</button></center>
                </div>
            </div>
        `;
    })
}

async function confimarEliminar(id) {
    const confirmar = confirm('¿ Desea eliminar la lección ?')

    if (confirmar) {

        const url = `https://localhost:44328/api/LeccionesInstructor?idLeccion=${id}`;

        await fetch(url, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': 'Bearer ' + stringJWT
            })
        })
            .then(respuesta => respuesta)
            .then(resultado => {
                console.log(resultado.body);
            })

        location.reload();
    }
}

async function visualizarVideoComentarios(codigoVideo,idLeccion){

    leccionEnProceso = idLeccion;
    
    const visualizador = document.querySelector('#visualizador');
    const textoAlerta = document.querySelector('#textoAlerta');

    if(visualizador){
        contenedorVideo.removeChild(visualizador);
    }else{
        contenedorVideo.removeChild(textoAlerta)
    }

    var video = document.createElement('iframe');

    video.width = "98%";
    video.height = "98%";
    video.id="visualizador";
    video.title="YouTube video player";
    video.frameborder="0";
    video.allowFullscreen="1";
    video.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;";
    video.src = `https://www.youtube.com/embed/${codigoVideo}?&autoplay=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&rel=0`;

    contenedorVideo.appendChild(video);

    obtenerComentarios(idLeccion);

        
}

async function obtenerComentarios(idLeccion){

    const urlComentarios = `https://localhost:44328/api/ComentariosInstructor?idLeccion=${idLeccion}`;

    await fetch(urlComentarios, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => {
            imprimirComentarios(resultado);
        })
}

async function imprimirComentarios(comentarios){

    limpiarComentarios();

    if(comentarios.length == 0){
        mostrarComentarios.innerHTML += `
        <div class="comentario">
            <center><h1> -- Sin Comentarios -- </h1></center>
        </div>
        `
        return;
    }

    comentarios.forEach(async comentario => {
        const { idUsuarioEstudiante, idComentario , mensaje, respuesta} = comentario;
        
        let nombresApellidos;

        var urlObtnerNombresDelEstudiante = `https://localhost:44328/api/PerfilEstudiante?idEstudiante=${idUsuarioEstudiante}`;

        await fetch(urlObtnerNombresDelEstudiante, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + stringJWT
            })
        })
            .then(respuesta => respuesta.json())
            .then(resultado => {
                nombresApellidos = resultado[0].nombres + ' ' + resultado[0].apellidos;
            })



        mostrarComentarios.innerHTML += `
        <div class="comentario">
                <h1> ⚫️ Usuario: ${nombresApellidos} | Id: ${idUsuarioEstudiante}</h1>
                <h2>Comentario: ${mensaje}</h2>
                <hr>
                <h2 id="respuesta">Respuesta: ${respuesta} 🔵 <button onclick="actualizarRespuesta(${idComentario});"> <img src="../Perfil/img/editar-logo.svg" style="background-color: black; cursor: pointer;"> </button></h2>
                <br>
                <input name="${idComentario}" style="display: none;" value="${respuesta}" placeholder="Escribe aquí tu respuesta"></input>
                <button style="display: none; margin-top: 10px;" id="${idComentario}" onclick="actualizarRespuestaTerminada(${idComentario});" class="btn btn-success">Guardar</button>
            </div>
        `;
    })

}

function actualizarRespuesta(idComentario){

    const btnGuardarRespuesta = document.querySelector(`button[id="${idComentario}"]`);
    const inputEditarRespuesta = document.querySelector(`input[name="${idComentario}"]`);

    if(inputEditarRespuesta.value === 'Sin respuesta'){
        inputEditarRespuesta.value = '';
    }

    inputEditarRespuesta.style.display = 'block';
    btnGuardarRespuesta.style.display = 'block';
}

async function actualizarRespuestaTerminada(idComentario){

    const inputEditarRespuesta = document.querySelector(`input[name="${idComentario}"]`);
    const btnGuardarRespuesta = document.querySelector(`button[id="${idComentario}"]`);

    if(inputEditarRespuesta.value === ''){
        alert('La respuesta no puede estar vacía');

        return;
    }

    var url = `https://localhost:44328/api/ComentariosInstructor?idComentario=${idComentario}&idInstructor=${idUsuarioObtenido}&repuesta=${inputEditarRespuesta.value}`;

    await fetch(url, {
        method: 'PUT',
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })

    inputEditarRespuesta.style.display = 'none';
    btnGuardarRespuesta.style.display = 'none';

    alert("Comentario editado exitosamente");

    obtenerComentarios(leccionEnProceso);
    
}



function limpiarComentarios(){
    while(mostrarComentarios.firstChild){
        mostrarComentarios.removeChild(mostrarComentarios.firstChild);
    }
}


function CerrarSesion() {
    Cookies.remove('jwt');
};


function mostrarSpinner(){

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `;

    mostrar.appendChild(spinner);
}

function eliminarSpinner(){
    const spinner = document.querySelector('.spinner');

    mostrar.removeChild(spinner);
}