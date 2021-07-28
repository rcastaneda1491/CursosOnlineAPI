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
    public class BuscadorCursosAdminController : Controller
    {
        [HttpGet]
        public ActionResult Get(string cursoNombre)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var curso = (from d in db.Cursos.Where(p => p.Nombre.Contains(cursoNombre))
                             select d).ToList();

                return Ok(curso);
            }
        }

    }
}
