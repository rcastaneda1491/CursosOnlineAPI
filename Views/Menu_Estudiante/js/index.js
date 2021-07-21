const cardListElement = document.getElementById("lista-cursos");
const searchInput = document.getElementById("search");

window.onload = () => {
  GetDatos();
}

function CerrarSesion(){
  Cookies.remove('jwt');
};


function GetDatos() {

  const url = `https://localhost:44328/api/CursoEstudiante`;


  fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => {
      mostrarDatos(resultado);
    })
}

function searchCursos() {
  document.getElementById('alert').style.display = 'none';
  if (searchInput.value == "") {
    document.getElementById("lista-cursos").innerHTML = "";
    GetDatos();
  }
  else {
    document.getElementById("lista-cursos").innerHTML = "";
    const url = `https://localhost:44328/api/BuscadorEstudiante?nombreCurso=${searchInput.value}`;

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => {
        mostrarDatos(resultado);
        if (Object.keys(resultado).length == 0) {
          document.getElementById('alert').style.display = 'block';
        } else {

          document.getElementById('alert').style.display = 'none';
        }
      })
  }
}


function mostrarDatos(datos) {

  datos.forEach(curso => {
    const card = `
    <div class="col">
      <div class="card">
      <div class="card-body">            
        <h4 class="card-title"">${curso.nombre}</h4>
        <p>${curso.descripcion}</p>
        <p>Duracion: ${curso.duracion}</p>
        <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${curso.idCurso}">$${curso.costoVenta}</a>
      </div>
      </div>
    </div> 
   `;
    cardListElement.innerHTML += card;
  })
}


