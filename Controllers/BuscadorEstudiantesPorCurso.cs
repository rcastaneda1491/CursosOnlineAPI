using CursosOnlineAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CursosOnlineAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class BuscadorEstudiantesPorCurso : ControllerBase
    {
        [HttpGet]
        public List<Usuario> Get(int IdCurso, string correoEstudiante)
        {
            var searchItems = BuscarDatos(IdCurso, correoEstudiante);
            return searchItems;
        }

        public static List<Usuario> BuscarDatos(int IdCurso, string correoEstudiante)
        {

            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var estudiantes = (from estudiante in db.Usuarios
                                   join compra in db.Compras on estudiante.IdUsuario equals compra.IdUsuario
                                   where (estudiante.Correo.Contains(correoEstudiante)) && compra.IdCurso == IdCurso
                                   select estudiante).ToList();

                return estudiantes;
            }
        }
    }
}

