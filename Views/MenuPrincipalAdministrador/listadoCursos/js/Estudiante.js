/* 
    Desarrollador: Rogelio Raúl Castañeda Flores
*/

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

function CerrarSesion() {
    Cookies.remove('jwt');
};
const urlParams = new URLSearchParams(window.location.search);
const IdICurso = urlParams.get('IdCurso');

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
    const url = `https://${direccion}/api/EstudiantesPorCursoAdmin?IdCurso=${IdICurso}`;

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

    datos.forEach(estudiante => {
        var status;
        var color;

        if (estudiante.estado == 1) {
            status = "Activo";
            color = "green";
        } else {
            status = "Inactivo";
            color = "red";
        }

        const card = `
            <tr>
                <td>${estudiante.idUsuario}</td>
                <td>${estudiante.nombres} ${estudiante.apellidos}</td>
                <td>${estudiante.correo}</td>
                <td>${estudiante.noTelefono}</td>
                <td>${estudiante.nit}</td>
                <td>${estudiante.rol}</td>
                <td style="color: ${color}">${status}</td>
            </tr>
        `;
        cardListElement.innerHTML += card;
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
        const url = `https://${direccion}/api/BuscadorEstudiantesPorCurso?IdCurso=${IdICurso}&correoEstudiante=${searchInput.value}`;

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