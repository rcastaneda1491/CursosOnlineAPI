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
    public class DatosCursoController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(int IdCurso)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var curso = (from d in db.Cursos.Where(p => p.IdCurso == IdCurso)
                               select d).ToList();

                return Ok(curso);
            }

        }
    }
}
