using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CursosOnlineAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ComentariosInstructorController : ControllerBase
    {

        [HttpGet]
        public ActionResult Get(int? idLeccion)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                //var comentarios = (from d in db.Comentarios select d).Where(d => d.IdLeccion == idLeccion).Include(d => d.IdUsuarioEstudianteNavigation.Nombres).ToList();

                var comentarios = db.Comentarios.Where(p => p.IdLeccion == idLeccion).ToList();


                return Ok(comentarios);


            }
        }

    }
}
