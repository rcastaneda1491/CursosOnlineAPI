using System;
using System.Collections.Generic;

#nullable disable

namespace CursosOnlineAPI.Models
{
    public partial class DatosInstructor
    {
        public DatosInstructor()
        {
            Usuarios = new HashSet<Usuario>();
        }

        public int IdDatos { get; set; }
        public string NivelEstudios { get; set; }
        public string Certificaciones { get; set; }
        public string ExperienciaLaboral { get; set; }
        public string NombreBanco { get; set; }
        public string NombreCuenta { get; set; }
        public string TipoDeCuenta { get; set; }
        public string NoCuentaBancaria { get; set; }

        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
