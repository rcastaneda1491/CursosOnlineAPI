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
    public class CursosController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(int? idInstructor)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var cursosInstructor = (from d in db.Cursos
                                        select d).Where(d => d.IdUsuario == idInstructor).ToList();

                return Ok(cursosInstructor);
            }
        }
    }
}
