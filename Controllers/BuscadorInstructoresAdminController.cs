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
    public class BuscadorInstructoresAdminController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(string correoInstructor)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var admin = (from d in db.Usuarios.Where(p => (p.Correo.Contains(correoInstructor)) && p.Rol == "instructor")
                             select d).ToList();

                return Ok(admin);
            }
        }

    }
}
