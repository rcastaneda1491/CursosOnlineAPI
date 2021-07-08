using System;
using System.Collections.Generic;

#nullable disable

namespace CursosOnlineAPI.Models
{
    public partial class Comentario
    {
        public int IdComentario { get; set; }
        public int IdLeccion { get; set; }
        public int IdUsuarioEstudiante { get; set; }
        public int IdUsuarioInstructor { get; set; }
        public string Mensaje { get; set; }
        public string Respuesta { get; set; }

        public virtual Leccione IdLeccionNavigation { get; set; }
        public virtual Usuario IdUsuarioEstudianteNavigation { get; set; }
        public virtual Usuario IdUsuarioInstructorNavigation { get; set; }
    }
}
