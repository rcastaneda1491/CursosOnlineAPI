const headers = {
  'Accept' : "application/json",
  "Content-Type": "application/json",
};
const UsuarioService = {
  getUsuarios() {
    return fetch(URL, {
      method: "GET",
    }).then((response) => response.json());
  },
  deleteUsuario(idUsuario) {
    return fetch(URL, {
      method: "DELETE",
      headers,
      body: JSON.stringify({idUsuario: idUsuario})
    }).then((response) => response.json());
  },
  updateUsuario(body) {
    console.info(body);
    return fetch(URL, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    }).then((response) => response.json());
  },
  saveUsuario(body) {
    return fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }).then((response) => response.json());
  },
};