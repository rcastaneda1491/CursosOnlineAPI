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
    public class PerfilAdminController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(int? idUsuario)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var usuario = (from d in db.Usuarios.Where(p => p.IdUsuario == idUsuario)
                               select d).ToList();

                return Ok(usuario);
            }

        }

        [HttpPut]
        public ActionResult Put(int? idUsuario, string nombres, string apellidos, string correo, string clave, string telefono, string nit)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                Models.Usuario estudiante = db.Usuarios.Find(idUsuario);

                estudiante.Nombres = nombres;
                estudiante.Apellidos = apellidos;
                estudiante.Correo = correo;
                estudiante.Clave = clave;
                estudiante.NoTelefono = telefono;
                estudiante.Nit = nit;

                db.Entry(estudiante).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();

                return Ok("Administrador Actualizado Correctamente");


            }
        }
    }
}