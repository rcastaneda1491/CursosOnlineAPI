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
    public class LeccionesEstudianteController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(int? idCurso)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var leccionesCursos = (from d in db.Lecciones select d).Where(d => d.IdCurso == idCurso).ToList();

                return Ok(leccionesCursos);
            }
        }
    }
}
