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
    [Authorize]
    public class BuscadorEstudiantesAdminController : Controller
    {
        [HttpGet]
        public ActionResult Get(string correoEstudiante)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var admin = (from d in db.Usuarios.Where(p => (p.Correo.Contains(correoEstudiante)) && p.Rol == "estudiante")
                             select d).ToList();

                return Ok(admin);
            }
        }

    }
}
