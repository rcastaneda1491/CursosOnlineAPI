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
    public class EstudianteAdminController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(int idUsuario)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var usuarioPeticion = db.Usuarios.Find(idUsuario);
                if (usuarioPeticion.Rol == "administrador")
                {
                    var estudiantes = (from d in db.Usuarios
                                            select d).Where(d => d.Rol == "estudiante").ToList();

                    return Ok(estudiantes);
                }
                else
                {
                    return Unauthorized();
                }
            }
        }

        [HttpPut]
        public ActionResult Put(int idUsuario, int idEstudiante)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var usuarioPeticion = db.Usuarios.Find(idUsuario);
                if (usuarioPeticion.Rol == "administrador")
                {
                    var estudiante = db.Usuarios.Find(idEstudiante);

                    if (estudiante.Estado == true)
                    {
                        estudiante.Estado = false;
                    }
                    else
                    {
                        estudiante.Estado = true;
                    }
                    db.Entry(estudiante).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();
                    return Ok(estudiante);
                }
                else
                {
                    return Unauthorized();
                }
            }
        }
    }


}
