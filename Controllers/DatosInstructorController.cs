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
    public class DatosInstructorController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(int? idInstructor)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                var datos = (from d in db.DatosInstructors
                             select d).Where(d => d.IdDatos == idInstructor).ToList();

                return Ok(datos);
            }
        }

        [HttpPost]
        public ActionResult Post(int IdDatos, string NivelEstudios, string Certificaciones, string ExperienciaLaboral, string NombreBanco, string NombreCuenta, string TipoDeCuenta, string NoCuentaBancaria)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                Models.DatosInstructor datos = new Models.DatosInstructor();

                datos.IdDatos = IdDatos;
                datos.NivelEstudios = NivelEstudios;
                datos.Certificaciones = Certificaciones;
                datos.ExperienciaLaboral = ExperienciaLaboral;
                datos.NombreBanco = NombreBanco;
                datos.NombreCuenta = NombreCuenta;
                datos.TipoDeCuenta = TipoDeCuenta;
                datos.NoCuentaBancaria = NoCuentaBancaria;

                db.DatosInstructors.Add(datos);
                db.SaveChanges();

                Models.Usuario datosInstructor = db.Usuarios.Find(IdDatos);
                datosInstructor.IdDatosInstructor = IdDatos;

                db.Entry(datosInstructor).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();


            }

            return Ok("Los Datos se añadieron correctamente");
        }


        [HttpPut]
        public ActionResult Put(int IdDatos, string NivelEstudios, string Certificaciones, string ExperienciaLaboral, string NombreBanco, string NombreCuenta, string TipoDeCuenta, string NoCuentaBancaria)
        {
            using (Models.CURSOS_ONLINE_APIContext db = new Models.CURSOS_ONLINE_APIContext())
            {
                Models.DatosInstructor datos = db.DatosInstructors.Find(IdDatos);

                datos.IdDatos = IdDatos;
                datos.NivelEstudios = NivelEstudios;
                datos.Certificaciones = Certificaciones;
                datos.ExperienciaLaboral = ExperienciaLaboral;
                datos.NombreBanco = NombreBanco;
                datos.NombreCuenta = NombreCuenta;
                datos.TipoDeCuenta = TipoDeCuenta;
                datos.NoCuentaBancaria = NoCuentaBancaria;

                db.Entry(datos).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();

            }

            return Ok("Datos Actualizados Correctamente");
        }



    }
}
