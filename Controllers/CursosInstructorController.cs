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
    public class CursosInstructorController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(int? idInstructor,int? idCurso)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                if(idCurso == null)
                {
                    var cursosInstructor = (from d in db.Cursos
                                            select d).Where(d => d.IdUsuario == idInstructor).ToList();

                    return Ok(cursosInstructor);
                }
                else
                {
                    var cursosInstructor = (from d in db.Cursos
                                            select d).Where(d => d.IdCurso == idCurso).ToList();

                    return Ok(cursosInstructor);
                }

                
            }
        }

        [HttpPost]
        public ActionResult Post(int IdUsuario , string nombre, string descripcion, decimal costo, decimal costoVenta, bool estado)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                Models.Curso curso = new Models.Curso();

                curso.Nombre = nombre;
                curso.Descripcion = descripcion;
                curso.Costo = costo;
                curso.CostoVenta = costoVenta;
                curso.Estado = estado;
                curso.IdUsuario = IdUsuario;

                db.Cursos.Add(curso);
                db.SaveChanges();

            }

            return Ok("El curso se añadio correctamente");
        }

        [HttpDelete]
        public ActionResult Delete(int IdCurso)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                Models.Curso curso = db.Cursos.Find(IdCurso);

                if(curso.CantidadEstudiantes > 0)
                {
                    return Ok("Estudiantes ya ha adquirido el curso, el curso no se puede eliminar");
                }
                else
                {
                    try
                    {
                        db.Cursos.Remove(curso);
                        db.SaveChanges();

                        return Ok("El curso se elimino correctamente");
                    }
                    catch (Exception)
                    {
                        return Ok("Elimine las lecciones del curso, e intentelo nuevamente");
                    }
                }
            }
        }

        [HttpPut]
        public ActionResult Put(int IdCurso, string nombre, string descripcion, decimal costo, decimal costoVenta, bool estado)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                Models.Curso datos = db.Cursos.Find(IdCurso);

                datos.Nombre = nombre;
                datos.Descripcion = descripcion;
                datos.Costo = costo;
                datos.CostoVenta = costoVenta;
                datos.Estado = estado;

                db.Entry(datos).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();

                return Ok("Datos Actualizados Correctamente");

            } 
        }
    }
}
