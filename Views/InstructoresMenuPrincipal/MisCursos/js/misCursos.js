const contenedor = document.querySelector('#contenedor');
const mostrar = document.querySelector('#cursosMostrar');

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
    cargarCursos();
}

function CerrarSesion() {
    Cookies.remove('jwt');
};


async function cargarCursos() {


    const url = `https://localhost:44328/api/CursosInstructor?idInstructor=${jwt.sub}`;

    await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarCursos(resultado);
        })
}

function mostrarCursos(cursos) {

    cursos.forEach(curso => {
        const { idCurso, nombre, descripcion, duracion, costo, costoVenta, cantidadEstudiantes, estado } = curso;

        let activoLetra;

        if (estado == 1) {
            activoLetra = 'Activo';
        } else {
            activoLetra = 'Deshabilitado';
        }

        mostrar.innerHTML += `
        <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${descripcion}
                <hr>
                Duracion: ${duracion} - Costo: ${costo} - Costo al estudiante: ${costoVenta} - Estado: ${activoLetra}</p>
                <a href="./editarCurso.html?idCurso=${idCurso}" class="btn" style="background-color:#FFDE59;">Editar Curso</a>
                <button class="btn btn-danger" onclick="confimarEliminar(${idCurso});">Eliminar Curso</button>
                <br>
                <br>
                <div class=""d-flex justify-content-center">
                    <a href="../Lecciones/lecciones.html?idCurso=${idCurso}" class="btn" type="button" style="width: 40%; background-color: #4F73CF; color:white;">Ir</a>
                </div>
            </div>
            <div class="card-footer text-muted">
                Cantidad de Estudiantes Inscritos: ${cantidadEstudiantes}
            </div>
        </div>
        <br>
        `;
    })
}

async function confimarEliminar(id) {
    const confirmar = confirm('¿ Desea eliminar el Curso ?')

    if (confirmar) {

        const url = `https://localhost:44328/api/CursosInstructor?IdCurso=${id}`;

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