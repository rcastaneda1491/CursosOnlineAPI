using System;
using System.Collections.Generic;

#nullable disable

namespace CursosOnlineAPI.Models
{
    public partial class CarritoCompra
    {
        public int IdUsuario { get; set; }
        public int IdCurso { get; set; }

        public virtual Curso IdCursoNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
    }
}
