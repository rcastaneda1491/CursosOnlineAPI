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


window.onload = () => {
    obtenerLecciones();
}


async function obtenerLecciones(){

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
        const { idLeccion, idCurso, titulo, descripcion, duracion, enlace } = leccion;

        mostrar.innerHTML += `
            <div class="card" style="border-radius: 0px; background-color: #fff; id="leccion">
                <div class="card-body">
                  <h5 class="card-title">${titulo}</h5>
                  <center><p class="card-text">${descripcion} | Duración: ${duracion} minutos</p>
                  <button onclick="visualizarVideo('${enlace}');" class="btn verleccion">Visualizar</button>

                </div>
            </div>
        `;
    })
}

function visualizarVideo(codigoVideo){
    
    const visualizador = document.querySelector('#visualizador');
    const textoAlerta = document.querySelector('#textoAlerta');

    if(visualizador){
        contenedorVideo.removeChild(visualizador);
    }else{
        contenedorVideo.removeChild(textoAlerta)
    }

    var video = document.createElement('iframe');

    video.width = "100%";
    video.height = "415px";
    video.id="visualizador";
    video.title="YouTube video player";
    video.frameborder="0";
    video.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; ";
    video.allowFullscreen = "1";
    video.src = `https://www.youtube.com/embed/${codigoVideo}?&autoplay=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&rel=0`;
    

    contenedorVideo.appendChild(video);


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