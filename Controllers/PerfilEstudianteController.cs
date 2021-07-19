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
    public class PerfilEstudianteController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(int? idEstudiante)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var usuario = (from d in db.Usuarios.Where(p => p.IdUsuario == idEstudiante)
                              select d).ToList();

                return Ok(usuario);
            }

        }

        [HttpPut]
        public ActionResult Put(int? idEstudiante, string nombres, string apellidos, string correo, string clave, string telefono, string nit, string noTarjeta )
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                Models.Usuario estudiante = db.Usuarios.Find(idEstudiante);

                estudiante.Nombres = nombres;
                estudiante.Apellidos = apellidos;
                estudiante.Correo = correo;
                estudiante.Clave = clave;
                estudiante.NoTelefono = telefono;
                estudiante.Nit = nit;
                estudiante.NoTarjeta = noTarjeta;

                db.Entry(estudiante).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();

                return Ok("Estudiante Actualizado Correctamente");


            }
        }
    }
}
