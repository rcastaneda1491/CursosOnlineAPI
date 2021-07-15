const cardListElement = document.getElementById("lista-cursos");

const insertCursoIntoDom = (curso) => {
    const card = `
    <div class="col">
      <div class="card">
      <div class="card-body">            
        <h4 class="card-title"">${curso.nombre}</h4>
        <p>${curso.descripcion}</p>
        <p>Duracion: ${curso.duracion}</p>
        <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${curso.idCurso}">$${curso.costoVenta}</a>
      </div>
      </div>
    </div> 
   `;  
    cardListElement.innerHTML += card;
  
  };

 

  const setCursos = async () => {
    cardListElement.innerHTML = "";
    const datacurso = await CursoService.getCursos();
    cursos = datacurso;
    cursos.forEach((curso) => insertCursoIntoDom(curso));
  };

  document.addEventListener("DOMContentLoaded", () => setCursos());

