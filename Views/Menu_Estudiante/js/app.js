// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
let articulosCarrito = [];
let idsMisCursos = [];
let validate;



// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     /*listaCursos.addEventListener('click', agregarCurso);*/

     // Cuando se elimina un curso del carrito
     //carrito.addEventListener('click', eliminarCurso);

     // NUEVO: Contenido cargado
     document.addEventListener('DOMContentLoaded', () => {
          GetDatosCurso();

          carritoHTML();

          GetDatosMisCursos();
     });
}


// Función que añade el curso al carrito
function agregarCurso(e) {
     console.log(idsMisCursos);
     validate = 0;
     e.preventDefault();
     // Delegation para agregar-carrito
     if (e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          for (i = 0; i < idsMisCursos.length; i++) {
               if (idsMisCursos[i] == curso.querySelector('a').getAttribute('data-id')) {

                    alert('Ya tienes este curso')
                    validate = 1;
                    break;
               }
          }

          if (validate != 1) {
               leerDatosCurso(curso);
               window.location.reload();
          }

          // Enviamos el curso seleccionado para tomar sus datos        
     }
}

async function GetDatosMisCursos() {

     console.log('llenando...')
     const url = `https://localhost:44328/api/MisCursosEstudiante?IdUsuario=${jwt.sub}`;

     await fetch(url, {
          headers: new Headers({
               'Authorization': 'Bearer ' + stringJWT
          })
     })
          .then(respuesta => respuesta.json())
          .then(resultado => {
               llenar(resultado);
          })
}


function llenar(datos) {

     datos.forEach(curso => {
          idsMisCursos.push(curso.idCurso);
     })
}


// Lee los datos del curso
async function leerDatosCurso(curso) {
     const infoCurso = {
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('a').textContent,
          id: curso.querySelector('a').getAttribute('data-id')
     }


     if (articulosCarrito.some(curso => curso.id === infoCurso.id)) {
          const cursos = articulosCarrito.map(curso => {
               if (curso.id === infoCurso.id) {
                    return curso;
               } else {
                    return curso;
               }
          })
          articulosCarrito = [...cursos];
     } else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }
     const curso_id = curso.querySelector('a').getAttribute('data-id');
     console.log(articulosCarrito)


     const urlActualizarUsuario = `https://localhost:44328/api/CarritoEstudiante?IdUsuario=${jwt.sub}&IdCurso=${curso_id}`;

     await fetch(urlActualizarUsuario, {
          method: 'POST',
          headers: new Headers({
               'Authorization': 'Bearer ' + stringJWT
          })
     })
          .then(respuesta => respuesta)
          .then(resultado => {
          })

     // console.log(articulosCarrito)
     carritoHTML();
}

// Elimina el curso del carrito en el DOM
async function eliminarCurso(e) {
     e.preventDefault();
     if (e.target.classList.contains('borrar-curso')) {
          // e.target.parentElement.parentElement.remove();
          const curso = e.target.parentElement.parentElement;
          const cursoId = curso.querySelector('a').getAttribute('data-id');

          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);


          const urlActualizarUsuario = `https://localhost:44328/api/CarritoEstudiante?IdUsuario=${jwt.sub}&IdCurso=${cursoId}`;

          await fetch(urlActualizarUsuario, {
               method: 'DELETE',
               headers: new Headers({
                    'Authorization': 'Bearer ' + stringJWT
               })
          })
               .then(respuesta => respuesta)
               .then(resultado => {
               })

          carritoHTML();

     }
     GetDatosCurso();
     window.location.reload();
}


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `

               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>
                    <a  class="borrar-curso deletecurso" data-id="${curso.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

     var elementscarrito = document.getElementsByClassName("deletecurso");

     for (var i = 0; i < elementscarrito.length; i++) {
          elementscarrito[i].addEventListener('click', eliminarCurso);
     }


}




// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     // forma rapida (recomendada)
     while (contenedorCarrito.firstChild) {

          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}


async function GetDatosCurso() {

     console.log('cargando...')
     const url = `https://localhost:44328/api/CarritoEstudiante?IdUsuario=${jwt.sub}`;

     await fetch(url, {
          headers: new Headers({
               'Authorization': 'Bearer ' + stringJWT
          })
     })
          .then(respuesta => respuesta.json())
          .then(resultado => {
               mostrarDatos2(resultado);
          })
}


function mostrarDatos2(datos) {

     console.log('mostrar datos')

     datos.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `

               <td>${curso.nombre}</td>
               <td>${curso.costoVenta}</td>
               <td>
                    <a href="#" class="borrar-curso deletecurso" data-id="${curso.idCurso}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

     var elementscarritos = document.getElementsByClassName("deletecurso");

     for (var i = 0; i < elementscarritos.length; i++) {
          elementscarritos[i].addEventListener('click', eliminarCurso);
     }

}



