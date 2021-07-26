using CursosOnlineAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
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
    [EnableCors("permitir")]
    [Authorize]
    public class CarritoEstudianteController : ControllerBase
    {
        [HttpPost]
        public ActionResult Post(int IdUsuario, int IdCurso)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                Models.CarritoCompra carrito = new Models.CarritoCompra();

                carrito.IdUsuario = IdUsuario;
                carrito.IdCurso = IdCurso;

                db.CarritoCompras.Add(carrito);
                db.SaveChanges();

            }

            return Ok("El carrito se añadio correctamente");
        }

        [HttpGet]
        public List<Curso> Get(int IdUsuario)
        {
            var searchItems = BuscarDatos(IdUsuario);
            return searchItems;
        }

        public static List<Curso> BuscarDatos(int idUsuario)
        {

            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var cursosList = new List<Curso>();
                var carrito = (from d in db.CarritoCompras
                               select d).Where(d => d.IdUsuario == idUsuario).ToList();


                foreach (var item in carrito)
                {
                    var curso = db.Cursos.Find(item.IdCurso);
                    cursosList.Add(new Curso { IdCurso = curso.IdCurso, Nombre = curso.Nombre, Descripcion = curso.Descripcion, Duracion = curso.Duracion, Costo = curso.Costo, CostoVenta = curso.CostoVenta, CantidadEstudiantes = curso.CantidadEstudiantes, IdUsuario = curso.IdUsuario });
                }

                return cursosList;
            }
        }

        [HttpDelete]
        public ActionResult Delete(int IdUsuario, int IdCurso)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                Models.CarritoCompra curso_carrito = db.CarritoCompras.Find(IdUsuario,IdCurso);

                db.CarritoCompras.Remove(curso_carrito);
                db.SaveChanges();

                return Ok("El curso se elimino del carrito correctamente");

            }
        }
    }
}
