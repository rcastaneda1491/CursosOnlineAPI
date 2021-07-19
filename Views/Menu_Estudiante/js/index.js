const cardListElement = document.getElementById("lista-cursos");
const searchInput = document.getElementById("search");

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
  GetDatos();
}

function CerrarSesion() {
  Cookies.remove('jwt');
};


function GetDatos() {

  const url = `https://localhost:44328/api/CursoEstudiante`;

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

function searchCursos() {
  document.getElementById('alert').style.display = 'none';
  if (searchInput.value == "") {
    document.getElementById("lista-cursos").innerHTML = "";
    GetDatos();
  }
  else {
    document.getElementById("lista-cursos").innerHTML = "";
    const url = `https://localhost:44328/api/BuscadorEstudiante?nombreCurso=${searchInput.value}`;

    fetch(url, {
      headers: new Headers({
        'Authorization': 'Bearer ' + stringJWT
      })
    })
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


