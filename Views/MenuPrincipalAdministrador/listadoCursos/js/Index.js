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
const urlParams = new URLSearchParams(window.location.search);
const IdInstructor = urlParams.get('IdInstructor');

window.onload = () => {
        GetDatos();
}

function GetDatos() {
    const url = `https://localhost:44328/api/CursosAdmin?idUsuario=${jwt.sub}`;

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
        var status;
        var color;

        if (curso.estado == 1) {
            status = "Activo";
            color = "green";
        } else {
            status = "Inactivo";
            color = "red";
        }

        const card = `
            <tr>
                <td>${curso.idCurso}</td>
                <td>${curso.nombre}</td>
                <td>${curso.descripcion}</td>
                <td>${curso.duracion}</td>
                <td>${curso.costo}</td>
                <td>${curso.costoVenta}</td>
                <td>${curso.cantidadEstudiantes}</td>
                <td>$.${curso.costoVenta * curso.cantidadEstudiantes}</td>
                <td style="color: ${color}">${status}</td>
                <td><button class="btn block" id="detalle" data-id="${curso.idCurso}" style="background-color: #4F73CF; color:white;"> Bloquear/Desbloquear </button></td>
            </tr>
        `;
        cardListElement.innerHTML += card;
    })
    var elements = document.getElementsByClassName("block");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', ModificarEstado);
    }
}

async function ModificarEstado(e) {
    const curso = e.target.parentElement.parentElement;
    const cursoId = curso.querySelector('button').getAttribute('data-id');

    const url = `https://localhost:44328/api/CursosInstructorAdmin?idUsuario=${jwt.sub}&idCurso=${cursoId}`;

    await fetch(url, {
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
      const url = `https://localhost:44328/api/BuscadorCursosAdmin?cursoNombre=${searchInput.value}`;
  
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