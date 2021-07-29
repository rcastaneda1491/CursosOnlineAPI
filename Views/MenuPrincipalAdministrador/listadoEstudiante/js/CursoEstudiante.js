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
const IdEstudiante = urlParams.get('IdEstudiante');

window.onload = () => {
    if(stringJWT){
        if (jwt.rol != "administrador") {
            history.back();
        } else {
            GetDatos();
        }
    }else{
        history.back();
    }
}

function GetDatos() {
    const url = `https://localhost:44328/api/CursosEstudianteAdmin?idUsuario=${jwt.sub}&IdEstudiante=${IdEstudiante}`;

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
                <td style="color: ${color}">${status}</td>
            </tr>
        `;
        cardListElement.innerHTML += card;
    })
}