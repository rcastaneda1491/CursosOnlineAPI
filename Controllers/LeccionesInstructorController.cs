using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CursosOnlineAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class LeccionesInstructorController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(int? idCurso)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
            var leccionesCursos = (from d in db.Lecciones select d).Where(d => d.IdCurso == idCurso).ToList();

            return Ok(leccionesCursos);
            }
        }


        [HttpPost]
        public ActionResult Post(int idCurso, string titulo, string descripcion, int duracion, string enlace)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                Models.Leccione leccion = new Models.Leccione();

                leccion.IdCurso = idCurso;
                leccion.Titulo = titulo;
                leccion.Descripcion = descripcion;
                leccion.Duracion = duracion;
                leccion.Enlace = enlace;

                db.Lecciones.Add(leccion);
                db.SaveChanges();

                Models.Curso curso = db.Cursos.Find(idCurso);
                curso.Duracion = curso.Duracion + duracion;

                db.Entry(curso).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();


            }

            return Ok("La lección se añadio correctamente");
        }


    }
}
