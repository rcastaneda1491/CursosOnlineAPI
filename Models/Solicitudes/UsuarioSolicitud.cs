using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CursosOnlineAPI.Models.Solicitudes
{
    public class UsuarioSolicitud
    {
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Correo { get; set; }
        public string NoTelefono { get; set; }
        public string Nit { get; set; }
        public string NoTarjeta { get; set; }
        public string Clave { get; set; }
        public string Rol { get; set; }
        public bool? Estado { get; set; }
        public int? IdDatosInstructor { get; set; }

        public virtual DatosInstructor IdDatosInstructorNavigation { get; set; }
    }
}
