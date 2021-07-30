const direccion = "25.104.8.22:5001";

window.onload = () => {
    GetDatos();
}

const cardListElement = document.getElementById("lista-cursos");
const searchInput = document.getElementById("search");

async function GetDatos() {
    const url = `https://${direccion}/api/MenuGeneral`;
  
    await fetch(url)
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
      const url = `https://${direccion}/api/MenuGeneral?nombreCurso=${searchInput.value}`;
  
      await fetch(url)
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

function agregarCurso(e){
    document.getElementById('alert2').style.display = 'block';

    setTimeout(() => {
        document.getElementById('alert2').style.display = 'none';
    }, 5000);
}