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
    public class MisCursosEstudianteController : ControllerBase
    {
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
                var compras = (from d in db.Compras
                               select d).Where(d => d.IdUsuario == idUsuario).ToList();


                foreach (var item in compras)
                {
                    var curso = db.Cursos.Find(item.IdCurso);
                    cursosList.Add(new Curso { IdCurso = curso.IdCurso, Nombre = curso.Nombre, Descripcion = curso.Descripcion, Duracion = curso.Duracion, Costo = curso.Costo, CostoVenta = curso.CostoVenta, CantidadEstudiantes = curso.CantidadEstudiantes, IdUsuario = curso.IdUsuario, Estado = curso.Estado });
                }

                return cursosList;
            }
        }
    }
}
