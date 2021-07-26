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

    const url = `https://localhost:44328/api/EstudianteAdmin?idUsuario=${jwt.sub}`;

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
              <td><button class="btn block" id="detalle" data-id="${instructor.idUsuario}"> Bloquear/Desbloquear </button></td>
              <td><button class="btn" id="detalle" data-id="${instructor.idUsuario}"> Ver Cursos </button></td>
            </tr>
        `;
        cardListElement.innerHTML += card;
    })

    var elements = document.getElementsByClassName("block");

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', ModificarEstado);
    }
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