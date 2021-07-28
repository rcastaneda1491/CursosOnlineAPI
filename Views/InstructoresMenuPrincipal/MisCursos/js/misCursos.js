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
    
    if (jwt.rol != "instructor") {
        history.back();

        return;
    }

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

        let gananciaGenerada = costo * cantidadEstudiantes;

        let duracionEnHoras = duracion / 60;
        duracionEnHoras = +duracionEnHoras.toFixed(2);

        mostrar.innerHTML += `
        <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${descripcion}
                <hr>
                Duracion: ${duracionEnHoras} hrs - Costo asignado: ${costo} - Costo al estudiante: ${costoVenta} - Estado: ${activoLetra}</p>
                <a href="./editarCurso.html?idCurso=${idCurso}" class="btn" style="background-color:#FFDE59;">Editar Curso</a>
                <button class="btn btn-danger" onclick="confimarEliminar(${idCurso},${cantidadEstudiantes},${duracion});">Eliminar Curso</button>
                <br>
                <br>
                <div class=""d-flex justify-content-center">
                    <a href="../Lecciones/lecciones.html?idCurso=${idCurso}" class="btn" type="button" style="width: 40%; background-color: #4F73CF; color:white;">Ir</a>
                </div>
            </div>
            <div class="card-footer text-muted">
                Cantidad de Estudiantes Inscritos: ${cantidadEstudiantes} | Ganancia Generada: ${gananciaGenerada}
            </div>
        </div>
        <br>
        `;
    })
}

async function confimarEliminar(id, cantidadEstudiantes, duracion) {
    
    if(cantidadEstudiantes > 0){
        alert('El Curso No se puede eliminar\nEl Curso ya ha sido comprado por estudiantes');
        return;
    }

    if(duracion > 0){
        alert('El Curso No se puede eliminar\nEl Curso aún contiene lecciones asignadas');
        return;
    }

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