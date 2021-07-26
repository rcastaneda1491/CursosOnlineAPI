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
    GetDatosMisCursos();
   
  }

  function GetDatosMisCursos() {
     
    console.log('llenando...')
         const url = `https://localhost:44328/api/MisCursosEstudiante?IdUsuario=${jwt.sub}`;
       
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
      const card = `
      <div class="col">
        <div class="card">
        <div class="card-body">            
          <h4 class="card-title"">${curso.nombre}</h4>
          <p>${curso.descripcion}</p>
          <p>Duracion: ${curso.duracion}</p>
          <button class="btn" id="boton-verleccion" data-id="${curso.idCurso}"> Ver Lecciones </button>
        </div>
        </div>
      </div> 
     `;
      cardListElement.innerHTML += card;
    })
  }