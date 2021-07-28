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
    public class InstructorAdminController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(int idUsuario)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var usuarioPeticion = db.Usuarios.Find(idUsuario);
                if (usuarioPeticion.Rol == "administrador")
                {
                    var instructores = (from d in db.Usuarios
                                            select d).Where(d => d.Rol == "instructor").ToList();

                    return Ok(instructores);
                }
                else
                {
                    return Unauthorized();
                }
            }
        }

        [HttpPut]
        public ActionResult Put(int idUsuario, int idInstructor)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var usuarioPeticion = db.Usuarios.Find(idUsuario);
                if (usuarioPeticion.Rol == "administrador")
                {
                    var instructor = db.Usuarios.Find(idInstructor);

                    if (instructor.Estado == true)
                    {
                        instructor.Estado = false;
                    }
                    else
                    {
                        instructor.Estado = true;
                    }
                    db.Entry(instructor).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();
                    return Ok(instructor);
                }
                else
                {
                    return Unauthorized();
                }
            }
        }
    }
}
