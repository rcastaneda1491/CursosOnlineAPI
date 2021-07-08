using System;
using System.Collections.Generic;

#nullable disable

namespace CursosOnlineAPI.Models
{
    public partial class Leccione
    {
        public Leccione()
        {
            Comentarios = new HashSet<Comentario>();
        }

        public int IdLeccion { get; set; }
        public int IdCurso { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public int Duracion { get; set; }
        public string Enlace { get; set; }

        public virtual Curso IdCursoNavigation { get; set; }
        public virtual ICollection<Comentario> Comentarios { get; set; }
    }
}
