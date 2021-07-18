/*function SignIn(){
    Cookies.get("jwt");
    Cookies.set("jwt", "casca");
}*/
const URL = 'https://localhost:44328/api/Usuarios/SignIn';
const emailInput = document.getElementById("inputEmail");
const passwordInput = document.getElementById("inputPassword");
const form = document.getElementById('signin-form');

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

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
        if(jwt.rol == "estudiante"){
            window.location.href = "../../Menu_Estudiante/index.html";
        }else if(jwt.rol == "instructores"){
            window.location.href = "../../InstructoresMenuPrincipal/menuPrincipalInstructor.html";
        };
    } catch (err) {
        console.error(err);
    }
}

form.addEventListener('submit', signIn)
