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
        public ActionResult Get(int? idCurso, int? idLeccion)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                if(idLeccion == null)
                {
                    var leccionesCursos = (from d in db.Lecciones select d).Where(d => d.IdCurso == idCurso).ToList();

                    return Ok(leccionesCursos);
                }
                else
                {
                    var leccionEspecifica = (from d in db.Lecciones select d).Where(d => d.IdLeccion == idLeccion).ToList();

                    return Ok(leccionEspecifica);
                }

            
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

        [HttpDelete]
        public ActionResult Delete(int idLeccion)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                Models.Leccione leccion = db.Lecciones.Find(idLeccion);

                Models.Curso curso = db.Cursos.Find(leccion.IdCurso);
                curso.Duracion = curso.Duracion - leccion.Duracion;

                db.Entry(curso).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();

                db.Lecciones.Remove(leccion);
                db.SaveChanges();

               return Ok("La lección se elimino correctamente");

            }
        }

        [HttpPut]
        public ActionResult Put(int idLeccion, string titulo, string descripcion, int duracion, string enlace)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                Models.Leccione datos = db.Lecciones.Find(idLeccion);

                int duracionAnterior = datos.Duracion;

                datos.Titulo = titulo;
                datos.Descripcion = descripcion;
                datos.Duracion = duracion;
                datos.Enlace = enlace;

                db.Entry(datos).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();

                Models.Curso curso = db.Cursos.Find(datos.IdCurso);
                curso.Duracion = (curso.Duracion - duracionAnterior) + duracion;

                db.Entry(curso).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();


                return Ok("Datos Actualizados Correctamente");

            }
        }


    }
}
