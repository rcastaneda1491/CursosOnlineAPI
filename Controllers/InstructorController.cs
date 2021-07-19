using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public class InstructorController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(int? idInstructor)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var datos = (from d in db.Usuarios
                             select d).Where(d => d.IdUsuario == idInstructor).ToList();

                return Ok(datos);
            }
        }

        [HttpPut]
        public ActionResult Put(int? idInstructor, string nombres, string apellidos, string correo, string telefono, string nit, string clave)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                Models.Usuario datosInstructor = db.Usuarios.Find(idInstructor);

                datosInstructor.Nombres = nombres;
                datosInstructor.Apellidos = apellidos;
                datosInstructor.Correo = correo;
                datosInstructor.NoTelefono = telefono;
                datosInstructor.Nit = nit;
                datosInstructor.Clave = clave;

                db.Entry(datosInstructor).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();

                return Ok("Usuario Actualizado Correctamente");


            }
        }


    }
}
