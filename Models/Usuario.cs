using System;
using System.Collections.Generic;

#nullable disable

namespace CursosOnlineAPI.Models
{
    public partial class Usuario
    {
        public Usuario()
        {
            ComentarioIdUsuarioEstudianteNavigations = new HashSet<Comentario>();
            ComentarioIdUsuarioInstructorNavigations = new HashSet<Comentario>();
            Compras = new HashSet<Compra>();
            Facturas = new HashSet<Factura>();
        }

        public int IdUsuario { get; set; }
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
        public virtual ICollection<Comentario> ComentarioIdUsuarioEstudianteNavigations { get; set; }
        public virtual ICollection<Comentario> ComentarioIdUsuarioInstructorNavigations { get; set; }
        public virtual ICollection<Compra> Compras { get; set; }
        public virtual ICollection<Factura> Facturas { get; set; }
    }
}
