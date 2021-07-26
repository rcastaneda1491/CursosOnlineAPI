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
    public class FacturaEstudianteController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(int IdUsuario)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var facturas = (from d in db.Facturas.Where(p => p.IdUsuario == IdUsuario)
                              select d).ToList();

                return Ok(facturas);
            }

        }


        [HttpPost]
        public ActionResult Post(string NoFactura, int IdUsuario, decimal Total)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                Models.Factura factura = new Models.Factura();

                factura.IdFactura = NoFactura;
                factura.IdUsuario = IdUsuario;
                factura.Total = Total;
                factura.Fecha = DateTime.Now;

                db.Facturas.Add(factura);
                db.SaveChanges();

            }

            return Ok("La Factura se añadio correctamente");
        }


        

    }
}
