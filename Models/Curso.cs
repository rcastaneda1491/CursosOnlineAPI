using System;
using System.Collections.Generic;

#nullable disable

namespace CursosOnlineAPI.Models
{
    public partial class Curso
    {
        public Curso()
        {
            Compras = new HashSet<Compra>();
            Lecciones = new HashSet<Leccione>();
        }

        public int IdCurso { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int? Duracion { get; set; }
        public decimal Costo { get; set; }
        public decimal CostoVenta { get; set; }
        public int? CantidadEstudiantes { get; set; }
        public bool? Estado { get; set; }
        public int IdUsuario { get; set; }

        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<Compra> Compras { get; set; }
        public virtual ICollection<Leccione> Lecciones { get; set; }
    }
}
