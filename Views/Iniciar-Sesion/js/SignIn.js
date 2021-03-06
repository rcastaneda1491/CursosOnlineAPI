/*
    Desarrollador: Rogelio Raúl Castañeda Flores
*/

const direccion = "25.104.8.22:5001";

const URL = `https://${direccion}/api/Usuarios/SignIn`;
const emailInput = document.getElementById("inputEmail");
const passwordInput = document.getElementById("inputPassword");
const form = document.getElementById('signin-form');
const alerta = document.querySelector('#alert');

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

let cantidadCorreos;

const signIn = async (e) => {
    e.preventDefault()
    const body = JSON.stringify({
        correo: emailInput.value,
        clave: passwordInput.value,
    })

    try {
        const response = await fetch(URL, {
            headers: {
                'Accept': "application/json, text/plain, */*",
                'Content-Type': "application/json;charset=utf-8"
            }, method: 'POST', body
        });
        const data = await response.text();
        emailInput.value = '';
        passwordInput.value = '';

        Cookies.set('jwt', data);
        
        const stringJWT = Cookies.get('jwt');
        let jwt;

        if (stringJWT) {
            jwt = parseJwt(stringJWT);
        }

        if(stringJWT == ""){
            alerta.textContent = "Correo o Contraseña Incorrecta"
            alerta.style.display = 'block';
            setTimeout(() => {
                alerta.style.display = 'none';
            }, 3000);
        }else if(jwt.estado == "True"){
            if(jwt.rol == "estudiante"){
                window.location.href = "../../Menu_Estudiante/index.html";
            }else if(jwt.rol == "instructor"){
                window.location.href = "../../InstructoresMenuPrincipal/menuPrincipalInstructor.html";
            }else if(jwt.rol == "administrador"){
                window.location.href = "../../MenuPrincipalAdministrador/Index.html";
            };
        }else{
            alerta.textContent = "Usuario Bloqueado o Inactivo"
            alerta.style.display = 'block';
            setTimeout(() => {
                alerta.style.display = 'none';
            }, 3000);
        }
    } catch (err) {
        console.error(err);
    }
}

form.addEventListener('submit', signIn)
