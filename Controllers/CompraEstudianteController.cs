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
    public class CompraEstudianteController : ControllerBase
    {
        [HttpPost]
        public ActionResult Post( int IdUsuario, int idCurso, string NoFactura)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                Models.Compra compra = new Models.Compra();

                compra.IdUsuario = IdUsuario;
                compra.IdCurso = idCurso;
                compra.IdFactura = NoFactura;

                db.Compras.Add(compra);
                db.SaveChanges();

            }

            return Ok("La compra se añadio correctamente");
        }

        [HttpDelete]
        public ActionResult Delete(int IdUsuario, int IdCurso)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                Models.CarritoCompra curso_carrito = db.CarritoCompras.Find(IdUsuario, IdCurso);

                db.CarritoCompras.Remove(curso_carrito);
                db.SaveChanges();

                return Ok("El carrito se elimino correctamente");

            }
        }


        [HttpPut]
        public ActionResult Put(int IdCurso)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                Models.Curso datos = db.Cursos.Find(IdCurso);

                datos.CantidadEstudiantes = datos.CantidadEstudiantes + 1;

                db.Entry(datos).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();

                return Ok("Datos Actualizados Correctamente");

            }
        }


    }
}
