const tableElements = document.getElementById("table");
const tableElements2 = document.getElementById("table2");

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
  
  window.onload = () =>{
    if (jwt.rol != "estudiante") {
      history.back();
  } else {
    GetFacturas();
  }
  }

  
  function CerrarSesion() {
    Cookies.remove('jwt');
  };

  function GetFacturas() {
    
         const url = `https://localhost:44328/api/FacturaEstudiante?IdUsuario=${jwt.sub}`;
       
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

function mostrarDatos(datos) {

    datos.forEach(factura => {
        var fechaSplit = factura.fecha.split("T");
        var fecha = fechaSplit[0];
        var horaSplit = fechaSplit[1].split(".");
        var hora = horaSplit[0];
           const card = `
        <tr>
          <td>${factura.idFactura}</td>
          <td>${fecha}</td>
          <td>${hora}</td>
          <td>${factura.total}</td>
          <td><button  class="btn block" id="detalle" data-id="${factura.idFactura}"> Ver Detalle </button></td>
        </tr>
          
     `;
      tableElements.innerHTML += card;
    })

    var elements = document.getElementsByClassName("block");

    for(var i=0;i<elements.length;i++){
        elements[i].addEventListener('click',GetDetalle);  
    }

  }


  function GetDetalle(e){
    
    const curso = e.target.parentElement.parentElement;
    const cursoId = curso.querySelector('button').getAttribute('data-id');

    const url = `https://localhost:44328/api/DetalleFactura?IdFactura=${cursoId}`;
       
         fetch(url, {
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
    document.getElementById("table2").innerHTML = "";

    datos.forEach(curso => {
        
           const card = `
        <tr>
          <td>${curso.nombre}</td>
          <td>${curso.descripcion}</td>
          <td>${curso.costoVenta}</td>
        </tr>
          
     `;
      tableElements2.innerHTML += card;
    })

  }