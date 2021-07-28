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
    public class ComentariosEstudiantesController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(int? idLeccion)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                
                var comentarios = db.Comentarios.Where(p => p.IdLeccion == idLeccion).ToList();


                return Ok(comentarios);


            }
        }

        [HttpPost]
        public ActionResult Post(int IdLeccion, int IdEstudiante, int IdInstructor, string mensaje)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                Models.Comentario comentario = new Models.Comentario();

                comentario.IdLeccion = IdLeccion;
                comentario.IdUsuarioEstudiante = IdEstudiante;
                comentario.IdUsuarioInstructor = IdInstructor;
                comentario.Mensaje = mensaje;

                db.Comentarios.Add(comentario);
                db.SaveChanges();

            }

            return Ok("El comentario se añadio correctamente");
        }
    }
}
