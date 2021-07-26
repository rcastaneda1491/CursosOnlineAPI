using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CursosOnlineAPI.Models.Solicitudes
{
    public partial class LeccionSolicitud
    {
        public int IdCurso { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public int Duracion { get; set; }
        public string Enlace { get; set; }

    }
}
