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
    public class AdministradoresController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(int idUsuario)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var usuarioPeticion = db.Usuarios.Find(idUsuario);
                if (usuarioPeticion.Rol == "administrador")
                {
                    var administradores = (from d in db.Usuarios
                                            select d).Where(d => d.Rol == "administrador").ToList();

                    return Ok(administradores);
                }
                else
                {
                    return Unauthorized();
                }
            }
        }

        [HttpPut]
        public ActionResult Put(int idUsuario, int idAdmin)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var usuarioPeticion = db.Usuarios.Find(idUsuario);
                if (usuarioPeticion.Rol == "administrador")
                {
                    var admin = db.Usuarios.Find(idAdmin);

                    if (admin.Estado == true)
                    {
                        admin.Estado = false;
                    }
                    else
                    {
                        admin.Estado = true;
                    }
                    db.Entry(admin).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();
                    return Ok(admin);
                }
                else
                {
                    return Unauthorized();
                }
            }
        }
    }
}
