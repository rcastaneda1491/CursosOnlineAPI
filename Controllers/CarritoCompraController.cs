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
    public class CarritoCompraController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(int IdUsuario)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var carrito = (from d in db.CarritoCompras.Where(p => p.IdUsuario == IdUsuario)
                                select d).ToList();

                return Ok(carrito);
            }

        }
    }
}
