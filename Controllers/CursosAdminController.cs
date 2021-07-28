using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

/*
    Desarrollador: Rogelio Raúl Castañeda Flores 
*/

namespace CursosOnlineAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CursosAdminController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(int idUsuario)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var usuarioPeticion = db.Usuarios.Find(idUsuario);
                if (usuarioPeticion.Rol == "administrador")
                {
                    var cursos = (from d in db.Cursos select d).ToList();

                    return Ok(cursos);
                }
                else
                {
                    return Unauthorized();
                }
            }
        }
    }
}
