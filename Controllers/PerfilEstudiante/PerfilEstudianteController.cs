using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CursosOnlineAPI.Controllers.PerfilEstudiante
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("permitir")]
    public class PerfilEstudianteController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get()
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var usuario = (from d in db.Usuarios.Where(p => p.IdUsuario == 1)
                              select d).ToList();

                return Ok(usuario);
            }

        }
    }
}
