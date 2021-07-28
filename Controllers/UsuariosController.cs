using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
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
    public class UsuariosController : ControllerBase
    {
        private readonly IJwtAuthenticationManager jwtAuthenticationManager;

        public UsuariosController(IJwtAuthenticationManager jwtAuthenticationManager)
        {
            this.jwtAuthenticationManager = jwtAuthenticationManager;
        }


        [AllowAnonymous]
        [HttpPost]
        public ActionResult Post(string Nombres, string Apellidos, string Correo, string NoTelefono, string Nit, string Clave, string Rol)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                Models.Usuario usuario = new Models.Usuario();
                usuario.Nombres = Nombres;
                usuario.Apellidos = Apellidos;
                usuario.Correo = Correo;
                usuario.NoTelefono = NoTelefono;
                usuario.Nit = Nit;
                usuario.Clave = Clave;
                usuario.Rol = Rol;

                db.Usuarios.Add(usuario);
                db.SaveChanges();
            }
            return Ok("Usuario añadido correctamente");
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("SignIn")]
        public ActionResult Post([FromBody] DTO.SignInDTO credentials)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var user = db.Usuarios.Where(x => x.Correo == credentials.Correo && x.Clave == credentials.Clave).FirstOrDefault();

                if (user == null)
                {
                    var tokenEmpty = "";
                    return Ok(tokenEmpty);
                }

                var token = jwtAuthenticationManager.Authenticate(user);
                return Ok(token);
            }
        }
    }
}
