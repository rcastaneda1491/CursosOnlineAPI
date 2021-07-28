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
    public class MenuGeneralController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(string nombreCurso)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                if(nombreCurso == null)
                {
                    var cursos = (from d in db.Cursos.Where(p => p.Estado == true)
                                  select d).ToList();

                    return Ok(cursos);
                }
                else
                {
                    var cursos = (from d in db.Cursos.Where(p => p.Nombre.Contains(nombreCurso) && p.Estado == true)
                                  select d).ToList();

                    return Ok(cursos);
                }

                
            }

        }
    }
}
