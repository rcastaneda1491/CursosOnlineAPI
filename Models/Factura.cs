﻿using System;
using System.Collections.Generic;

#nullable disable

namespace CursosOnlineAPI.Models
{
    public partial class Factura
    {
        public Factura()
        {
            Compras = new HashSet<Compra>();
        }

        public int IdFactura { get; set; }
        public int IdUsuario { get; set; }
        public decimal? Total { get; set; }
        public DateTime? Fecha { get; set; }

        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<Compra> Compras { get; set; }
    }
}
