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

const mostrar = document.querySelector('#listado');
const contenedorVideo = document.querySelector('#contenedorVideo');

const alerta = document.querySelector('#alert');
const mostrarComentarios = document.querySelector('#comentarios');

const preguntainput = document.querySelector('#pregunta');
const titulocurso = document.querySelector('#titulo');

let idLeccionpregunta;
let idInstructorpregunta;
let idcursobusqueda;
let codigo;


window.onload = () => {
    if (stringJWT) {
        if (jwt.rol != "estudiante") {
            history.back();
        } else {
            GetTitulo();
            obtenerLecciones();
        }
    } else {
        history.back();
    }
}

async function obtenerLecciones() {

    mostrarSpinner();


    const url = `https://localhost:44328/api/LeccionesEstudiante?idCurso=${idCurso}`;

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
        const { idLeccion, idCurso, titulo, descripcion, duracion, enlace, idUsuario } = leccion;

        mostrar.innerHTML += `
            <div class="card" style="border-radius: 0px; background-color: #fff; id="leccion">
                <div class="card-body">
                  <h5 class="card-title">${titulo}</h5>
                  <center><p class="card-text">${descripcion} | Duración: ${duracion} minutos</p>
                  <button onclick="visualizarVideoComentarios('${enlace}',${idLeccion},${idCurso});" class="btn" style="background-color: #4F73CF; color:white;">Visualizar</button>
                </div>
            </div>
        `;
    })
}




async function visualizarVideoComentarios(codigoVideo, idLeccion, idCurso) {
    codigo = codigoVideo;
    idLeccionpregunta = idLeccion;
    idcursobusqueda = idCurso;

    const visualizador = document.querySelector('#visualizador');
    const textoAlerta = document.querySelector('#textoAlerta');

    if (visualizador) {
        contenedorVideo.removeChild(visualizador);
    } else {
        contenedorVideo.removeChild(textoAlerta)
    }

    var video = document.createElement('iframe');

    video.width = "98%";
    video.height = "98%";
    video.id = "visualizador";
    video.title = "YouTube video player";
    video.frameborder = "0";
    video.allowFullscreen = "1";
    video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;";
    video.src = `https://www.youtube.com/embed/${codigoVideo}?&autoplay=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&rel=0`;

    contenedorVideo.appendChild(video);

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

    document.getElementById('divpregunta').style.display = 'flex';
}

async function imprimirComentarios(comentarios) {
    document.getElementById("comentarios").innerHTML = "";

    comentarios.forEach(async comentario => {
        const { idUsuarioEstudiante, idUsuarioInstructor, mensaje, respuesta } = comentario;

        let nombresApellidos;
        let nombresApellidosEstudiante;

        var urlObtnerNombresDelInstructor = `https://localhost:44328/api/Instructor?idInstructor=${idUsuarioInstructor}`;
        var urlObtnerNombresDelEstudiante = `https://localhost:44328/api/PerfilEstudiante?idEstudiante=${idUsuarioEstudiante}`;

        await fetch(urlObtnerNombresDelInstructor, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + stringJWT
            })
        })
            .then(respuesta => respuesta.json())
            .then(resultado => {
                nombresApellidos = resultado[0].nombres + ' ' + resultado[0].apellidos;
            })

        await fetch(urlObtnerNombresDelEstudiante, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + stringJWT
            })
        })
            .then(respuesta => respuesta.json())
            .then(resultado => {
                nombresApellidosEstudiante = resultado[0].nombres + ' ' + resultado[0].apellidos;
            })


        mostrarComentarios.innerHTML += `
        <div class="comentario">
            <h1> ⚫️ Estudiante: ${nombresApellidosEstudiante}</h1>
            <h2 >Comentario: ${mensaje}   </h2>
            <hr>   
                 
            <h1 > 🔵 Instructor: ${nombresApellidos}</h1>
            <h2 >Respuesta: ${respuesta}</h2>
            <br>
        </div>
        `;


    })

}


function CerrarSesion() {
    Cookies.remove('jwt');
};


function mostrarSpinner() {

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `;

    mostrar.appendChild(spinner);
}

function eliminarSpinner() {
    const spinner = document.querySelector('.spinner');

    mostrar.removeChild(spinner);
}


async function enviarpregunta() {
    let idInstructorpregunta;

    var urlidInstructor = ` https://localhost:44328/api/IdInstructor?IdCurso=${idcursobusqueda}`;

    await fetch(urlidInstructor, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => {
            idInstructorpregunta = resultado[0].idUsuario;
        })

    if (preguntainput.value != "") {
        const url = `https://localhost:44328/api/ComentariosEstudiantes?IdLeccion=${idLeccionpregunta}&IdEstudiante=${jwt.sub}&IdInstructor=${idInstructorpregunta}&mensaje=${preguntainput.value}`;

        await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + stringJWT
            })
        })
            .then(respuesta => respuesta)
            .then(resultado => {
            })

        preguntainput.value = "";
    } else {
        alert('Escribe un Comentario');

    }

    visualizarVideoComentarios(codigo, idLeccionpregunta, idcursobusqueda);
}


async function GetTitulo() {
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
        const { idCurso, nombre, descripcion, duracion, costo, costoVenta, cantidadEstudiante, estado, idUsuario } = curso;

        titulocurso.innerHTML += `
            <h1>${nombre}</h1>
            <h5>${descripcion}</h5>
        `;
    })
}