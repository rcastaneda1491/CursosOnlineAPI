const submitButton = document.getElementById("submitButton");
const form = document.getElementById("form");

let currentPersona = null;
let usuarios = [];

getFormData = () => {
    const { correo, clave, nombres, apellidos, noTelefono, nit, rol } =
        form.elements;
    return {
        nombres: nombres.value,
        apellidos: apellidos.value,
        correo: correo.value,
        noTelefono: noTelefono.value,
        nit: nit.value,
        clave: clave.value,
        rol: rol.value
    };
};


submitButton.addEventListener("click", () => {
    let formData = getFormData();
    UsuarioService.saveUsuario(formData)
    .catch(console.error);
    alert("Usuario agregado correctamente");
});