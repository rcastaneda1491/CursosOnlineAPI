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
    [Authorize]
    public class CursosInstructorAdminController : ControllerBase
    {
        [HttpGet]
        public List<Curso> Get(int idUsuario, int IdInstructor)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var usuarioPeticion = db.Usuarios.Find(idUsuario);
                if (usuarioPeticion.Rol == "administrador")
                {
                    var searchItems = BuscarDatos(IdInstructor);
                    return searchItems;
                }
                else
                {
                    return new List<Curso>();
                }
            }
        }

        public static List<Curso> BuscarDatos(int IdInstructor)
        {

            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var cursosList = new List<Curso>();
                var compras = (from d in db.Cursos
                               select d).Where(d => d.IdUsuario == IdInstructor).ToList();


                foreach (var item in compras)
                {
                    var curso = db.Cursos.Find(item.IdCurso);
                    cursosList.Add(new Curso { IdCurso = curso.IdCurso, Nombre = curso.Nombre, Descripcion = curso.Descripcion, Duracion = curso.Duracion, Costo = curso.Costo, CostoVenta = curso.CostoVenta, CantidadEstudiantes = curso.CantidadEstudiantes, IdUsuario = curso.IdUsuario });
                }

                return cursosList;
            }
        }
    }
}
