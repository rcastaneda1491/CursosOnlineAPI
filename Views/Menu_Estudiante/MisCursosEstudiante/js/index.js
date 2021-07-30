const direccion = "25.104.8.22:5001";

const cardListElement = document.getElementById("lista-cursos");

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
  if (stringJWT) {
    if (jwt.rol != "estudiante") {
      history.back();
    } else {
      GetDatosMisCursos();
    }
  } else {
    history.back();
  }
}

function GetDatosMisCursos() {

  console.log('llenando...')
  const url = `https://${direccion}/api/MisCursosEstudiante?IdUsuario=${jwt.sub}`;

  fetch(url, {
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
    let duracionEnHoras = curso.duracion / 60;
    duracionEnHoras = +duracionEnHoras.toFixed(2);
    if (curso.estado == 1) {
      const card = `
        <div class="col">
          <div class="card">
            <div class="card-body">            
              <h4 class="card-title"">${curso.nombre}</h4>
              <p>${curso.descripcion}</p>
              <p>Duracion: ${duracionEnHoras} hrs</p>
              <button class="btn view" id="boton-verleccion" data-id="${curso.idCurso}"> Ver Lecciones </button>
            </div>
          </div>
        </div> 
       `;
      cardListElement.innerHTML += card;
    } else {
      const card2 = `
        <div class="col">
          <div class="card">
            <div class="card-body">            
              <h4 class="card-title"">${curso.nombre}</h4>
              <p>${curso.descripcion}</p>
              <p>Duracion: ${duracionEnHoras} hrs</p>
              <button class="btn btn-danger" disabled> Inactivo </button>
            </div>
          </div>
        </div> 
       `;
      cardListElement.innerHTML += card2;
    }
  })

  var elements = document.getElementsByClassName("view");

  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', viewleccion);
  }
}

function viewleccion(e) {
  const curso = e.target.parentElement.parentElement;
  const cursoId = curso.querySelector('button').getAttribute('data-id');
  window.location.href = (`./lecciones.html?idCurso=${cursoId}`);
}
