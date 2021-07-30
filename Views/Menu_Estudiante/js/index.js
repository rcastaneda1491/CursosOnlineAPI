const direccion = "25.104.8.22:5001";

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
  if (stringJWT) {
    if (jwt.rol != "estudiante") {
      history.back();
    } else {
      GetDatos();
    }
  } else {
    history.back();
  }
}

function CerrarSesion() {
  Cookies.remove('jwt');
};


async function GetDatos() {

  const url = `https://${direccion}/api/CursoEstudiante`;

  await fetch(url, {
    headers: new Headers({
      'Authorization': 'Bearer ' + stringJWT
    })
  })
    .then(respuesta => respuesta.json())
    .then(resultado => {
      mostrarDatos(resultado);
    })
}

async function searchCursos() {
  document.getElementById('alert').style.display = 'none';
  if (searchInput.value == "") {
    document.getElementById("lista-cursos").innerHTML = "";
    GetDatos();
  }
  else {
    document.getElementById("lista-cursos").innerHTML = "";
    const url = `https://${direccion}/api/BuscadorEstudiante?nombreCurso=${searchInput.value}`;

    await fetch(url, {
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
    let duracionEnHoras = curso.duracion / 60;
    duracionEnHoras = +duracionEnHoras.toFixed(2);
    const card = `
    <div class="col">
      <div class="card">
      <div class="card-body">            
        <h4 class="card-title"">${curso.nombre}</h4>
        <p>${curso.descripcion}</p>
        <p>Duracion: ${duracionEnHoras} hrs</p>
        <a style="background-color: #09297C; color: white;" class="u-full-width button input agregar-carrito addcarrito" data-id="${curso.idCurso}">$${curso.costoVenta}</a>
      </div>
      </div>
    </div> 
   `;
    cardListElement.innerHTML += card;
  })

  var elements = document.getElementsByClassName("addcarrito");

    for(var i=0;i<elements.length;i++){
        elements[i].addEventListener('click',agregarCurso);  
    }
}