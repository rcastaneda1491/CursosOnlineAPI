/* 
    Desarrollador: Rogelio Raúl Castañeda Flores
*/

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

function CerrarSesion(){
    Cookies.remove('jwt');
};

window.onload = () => {
    if(stringJWT){
        if (jwt.rol != "administrador") {
            history.back();
        }
    }else{
        history.back();
    }
}
