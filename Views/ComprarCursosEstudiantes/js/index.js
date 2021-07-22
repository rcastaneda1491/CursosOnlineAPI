const tableElements = document.getElementById("table");
const idsCursos = [];
const precio = [];
let total = 0;
let generarid;


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
    DatosUsuario();
    GetDatosCurso();
    
  }
  
  function CerrarSesion() {
    Cookies.remove('jwt');
  };

function GetDatosCurso() {
     
    console.log('cargando...')
         const url = `https://localhost:44328/api/CarritoEstudiante?IdUsuario=${jwt.sub}`;
       
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

    datos.forEach(curso => {
        
    idsCursos.push(curso.idCurso)
    precio.push(curso.costoVenta)
      
      const card = `
        <tr>
          <td>${curso.nombre}</td>
          <td>${curso.descripcion}</td>
          <td>${curso.costoVenta}</td>
        </tr>
          
     `;
      tableElements.innerHTML += card;
    })

    MostrarTotal();
  }

function MostrarTotal(){

    for(i=0;i< precio.length;i++){
        total = precio[i]+ total;
    }

        const card = `
        <tr>
        <td></td>
        <td></td>
        <td>${total}</td>
        </tr>
        
    `;
    tableElements.innerHTML += card;
}


function GenerarFactura(){

    generarid = uuid.v4();
    
    const url = `https://localhost:44328/api/FacturaEstudiante?NoFactura=${generarid}&IdUsuario=${jwt.sub}&Total=${total}`;

    fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta)
        .then(resultado => {
        })

        GenerarCompra();  
}

function GenerarCompra(){

    for(i=0;i< idsCursos.length;i++){
        const url = `https://localhost:44328/api/CompraEstudiante?IdUsuario=${jwt.sub}&idCurso=${idsCursos[i]}&NoFactura=${generarid}`;

    fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta)
        .then(resultado => {
        })
    }
    

    BorrarCarrito();
    
}


function BorrarCarrito(){
    for(i=0;i< idsCursos.length;i++){

    const urlVaciarCarrito = `https://localhost:44328/api/CompraEstudiante?IdUsuario=${jwt.sub}&IdCurso=${idsCursos[i]}`;

    fetch(urlVaciarCarrito, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta)
        .then(resultado => {
        })
    } 

    alert('Compra Exitosa');
    window.location.reload();
}

function DatosUsuario() {
   
    
    const url = `https://localhost:44328/api/PerfilEstudiante?idEstudiante=${jwt.sub}`;

    fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => {
            Validar(resultado);
            
           
        })

        
}


function Validar(data){
    data.forEach(estudiante => {
        const { nombres, apellidos, correo, clave, noTelefono, nit, noTarjeta } = estudiante;

        if(noTarjeta != null){
            
        document.getElementById('alert').style.display = 'none';
        document.getElementById('compra').style.display = 'block'
        }else {
          
            document.getElementById('alert').style.display = 'block';
            document.getElementById('compra').style.display = 'none';
        }

    })
       
}


