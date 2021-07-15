const headers = {
    'Accept' : "application/json",
    "Content-Type": "application/json",
  };
  const CursoService = {
    getCursos() {
      return fetch(URL, {
        method: "GET",
      }).then((response) => response.json());
    },
  };
  