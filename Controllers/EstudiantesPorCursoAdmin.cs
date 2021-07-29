using CursosOnlineAPI.Models;
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
    public class EstudiantesPorCursoAdmin : ControllerBase
    {
        [HttpGet]
        public List<Usuario> Get(int IdCurso)
        {
            var searchItems = BuscarDatos(IdCurso);
            return searchItems;
        }

        public static List<Usuario> BuscarDatos(int idCurso)
        {

            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var usuariosList = new List<Usuario>();
                var compras = (from d in db.Compras
                               select d).Where(d => d.IdCurso == idCurso).ToList();


                foreach (var item in compras)
                {
                    var usuario = db.Usuarios.Find(item.IdUsuario);
                    usuariosList.Add(new Usuario { IdUsuario = usuario.IdUsuario, Nombres = usuario.Nombres, Apellidos = usuario.Apellidos, Correo = usuario.Correo = usuario.Correo, NoTelefono = usuario.NoTelefono, Nit = usuario.Nit, NoTarjeta = usuario.NoTarjeta, Clave = usuario.Clave, Rol = usuario.Rol,  Estado = usuario.Estado });
                }

                return usuariosList;
            }
        }
    }
}