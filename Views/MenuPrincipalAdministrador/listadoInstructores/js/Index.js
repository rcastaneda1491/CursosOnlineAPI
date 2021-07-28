/*
    Desarrollador: Rogelio Raúl Castañeda Flores
*/

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

function CerrarSesion() {
    Cookies.remove('jwt');
};

window.onload = () => {
    if(jwt.rol != "administrador"){
        history.back();
    }else{
        GetDatos();
    }
}

function GetDatos() {

    const url = `https://localhost:44328/api/InstructorAdmin?idUsuario=${jwt.sub}`;

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

    datos.forEach(instructor => {
        var status;
        var color;

        if (instructor.estado == true) {
            status = "Activo";
            color = "green";
        } else {
            status = "Inactivo";
            color = "red";
        }

        const card = `
            <tr>
              <td>${instructor.nombres} ${instructor.apellidos}</td>
              <td>${instructor.correo}</td>
              <td>${instructor.noTelefono}</td>
              <td>${instructor.nit}</td>
              <td>${instructor.rol}</td>
              <td style="color: ${color}">${status}</td>
              <td class="block"><button class="btn" id="detalle" data-id="${instructor.idUsuario}" style="background-color: #4F73CF; color:white;"> Bloquear/Desbloquear </button></td>
              <td><button class="btn cursosBoton" id="detalle" data-id="${instructor.idUsuario}" style="background-color: #4F73CF; color:white;"> Ver Cursos </button></td>
            </tr>
        `;
        cardListElement.innerHTML += card;
    })

    var elements = document.getElementsByClassName("block");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', ModificarEstado);
    }

    var elementsCursos = document.getElementsByClassName("cursosBoton");
    for (var i = 0; i < elementsCursos.length; i++) {

        elementsCursos[i].addEventListener('click', EnviarACursos);
    }
}

function EnviarACursos(e) {
    const estudiante = e.target.parentElement.parentElement;
    const instructorId = estudiante.querySelector('button').getAttribute('data-id');
    window.location.href = (`./CursosInstructor.html?IdInstructor=${instructorId}`);
}

function ModificarEstado(e) {
    const estudiante = e.target.parentElement.parentElement;
    const estudianteId = estudiante.querySelector('button').getAttribute('data-id');

    const url = `https://localhost:44328/api/EstudianteAdmin?idUsuario=${jwt.sub}&idEstudiante=${estudianteId}`;

    fetch(url, {
        method: 'PUT',
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
    alert("Estado actualizado correctamente", window.location.reload());

}

async function searchCursos() {
    document.getElementById('alert').style.display = 'none';
    if (searchInput.value == "") {
      document.getElementById("lista-cursos").innerHTML = "";
      GetDatos();
    }
    else {
      document.getElementById("lista-cursos").innerHTML = "";
      const url = `https://localhost:44328/api/BuscadorInstructoresAdmin?correoInstructor=${searchInput.value}`;
  
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