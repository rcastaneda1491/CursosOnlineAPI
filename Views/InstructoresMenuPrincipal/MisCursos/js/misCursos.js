const contenedor = document.querySelector('#contenedor');
const mostrar = document.querySelector('#cursosMostrar');

window.onload = () => {
    

    cargarCursos();
}

function cargarCursos(){
    const idInstructor = 1;

    const url = `https://localhost:44328/api/CursosInstructor?idInstructor=${idInstructor}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarCursos(resultado);
        })
}

function mostrarCursos(cursos){
    
    cursos.forEach( curso => {
        const { idCurso, nombre , descripcion, duracion, costo, costoVenta, cantidadEstudiantes, estado} = curso;

        let activoLetra;

        if(estado == 1){
            activoLetra = 'Activo';
        }else{
            activoLetra = 'Deshabilitado';
        }

        mostrar.innerHTML += `
        <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${descripcion}
                <hr>
                Duracion: ${duracion} - Costo al estudiante: ${costoVenta} - Estado: ${activoLetra}</p>
                <div class="d-grid gap-2">
                    <button class="btn btn-info" type="button">Ir</button>
                </div>
                <br>
                <a href="./editarCurso.html?idCurso=${idCurso}" class="btn btn-warning">Editar Curso</a>
                <button class="btn btn-danger" onclick="confimarEliminar(${idCurso});">Eliminar Curso</button>
            </div>
            <div class="card-footer text-muted">
                Cantidad de Estudiantes Inscritos: ${cantidadEstudiantes}
            </div>
        </div>
        <br>
        `;
    })
}

function confimarEliminar(id){
    const confirmar = confirm('¿ Desea eliminar el Curso ?')

    if(confirmar){

        const url = `https://localhost:44328/api/CursosInstructor?IdCurso=${id}`;

        fetch(url , { method: 'DELETE'})
        .then(respuesta => respuesta)
        .then(resultado => {
            console.log(resultado.body);
    })

    location.reload();



    }
}