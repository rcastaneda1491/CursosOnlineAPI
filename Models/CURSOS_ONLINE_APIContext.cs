using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace CursosOnlineAPI.Models
{
    public partial class CURSOS_ONLINE_APIContext : DbContext
    {
        public CURSOS_ONLINE_APIContext()
        {
        }

        public CURSOS_ONLINE_APIContext(DbContextOptions<CURSOS_ONLINE_APIContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CarritoCompra> CarritoCompras { get; set; }
        public virtual DbSet<Comentario> Comentarios { get; set; }
        public virtual DbSet<Compra> Compras { get; set; }
        public virtual DbSet<Curso> Cursos { get; set; }
        public virtual DbSet<DatosInstructor> DatosInstructors { get; set; }
        public virtual DbSet<Factura> Facturas { get; set; }
        public virtual DbSet<Leccione> Lecciones { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=LAPTOP-AA3NT37P;DATABASE=CURSOS_ONLINE_API;user=Usuario1;password=Usuario1");


            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");

            modelBuilder.Entity<CarritoCompra>(entity =>
            {
                entity.HasKey(e => new { e.IdUsuario, e.IdCurso })
                    .HasName("PK__CarritoC__2C023D7639D703F2");

                entity.ToTable("CarritoCompra");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.IdCurso).HasColumnName("idCurso");

                entity.HasOne(d => d.IdCursoNavigation)
                    .WithMany(p => p.CarritoCompras)
                    .HasForeignKey(d => d.IdCurso)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_COMPRASCARRITO_CURSOS");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.CarritoCompras)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_COMPRASCARRITO_USUARIO");
            });

            modelBuilder.Entity<Comentario>(entity =>
            {
                entity.HasKey(e => e.IdComentario)
                    .HasName("PK__Comentar__C74515DA09075616");

                entity.ToTable("Comentario");

                entity.Property(e => e.IdComentario).HasColumnName("idComentario");

                entity.Property(e => e.IdLeccion).HasColumnName("idLeccion");

                entity.Property(e => e.IdUsuarioEstudiante).HasColumnName("idUsuarioEstudiante");

                entity.Property(e => e.IdUsuarioInstructor).HasColumnName("idUsuarioInstructor");

                entity.Property(e => e.Mensaje)
                    .IsRequired()
                    .HasMaxLength(300)
                    .IsUnicode(false)
                    .HasColumnName("mensaje");

                entity.Property(e => e.Respuesta)
                    .HasMaxLength(300)
                    .IsUnicode(false)
                    .HasColumnName("respuesta")
                    .HasDefaultValueSql("('Sin respuesta')");

                entity.HasOne(d => d.IdLeccionNavigation)
                    .WithMany(p => p.Comentarios)
                    .HasForeignKey(d => d.IdLeccion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_COMENTARIO_LECCION");

                entity.HasOne(d => d.IdUsuarioEstudianteNavigation)
                    .WithMany(p => p.ComentarioIdUsuarioEstudianteNavigations)
                    .HasForeignKey(d => d.IdUsuarioEstudiante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_COMENTARIOEstudiante_USUARIO");

                entity.HasOne(d => d.IdUsuarioInstructorNavigation)
                    .WithMany(p => p.ComentarioIdUsuarioInstructorNavigations)
                    .HasForeignKey(d => d.IdUsuarioInstructor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_COMENTARIOInstructor_USUARIO");
            });

            modelBuilder.Entity<Compra>(entity =>
            {
                entity.HasKey(e => new { e.IdFactura, e.IdCurso })
                    .HasName("PK__Compra__748076AE8929EC36");

                entity.ToTable("Compra");

                entity.Property(e => e.IdFactura)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("idFactura");

                entity.Property(e => e.IdCurso).HasColumnName("idCurso");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.HasOne(d => d.IdCursoNavigation)
                    .WithMany(p => p.Compras)
                    .HasForeignKey(d => d.IdCurso)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_COMPRAS_CURSOS");

                entity.HasOne(d => d.IdFacturaNavigation)
                    .WithMany(p => p.Compras)
                    .HasForeignKey(d => d.IdFactura)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_COMPRA_FACTURA");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Compras)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_COMPRAS_USUARIO");
            });

            modelBuilder.Entity<Curso>(entity =>
            {
                entity.HasKey(e => e.IdCurso)
                    .HasName("PK__Cursos__8551ED05C5EC2A53");

                entity.Property(e => e.IdCurso).HasColumnName("idCurso");

                entity.Property(e => e.CantidadEstudiantes)
                    .HasColumnName("cantidadEstudiantes")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Costo)
                    .HasColumnType("decimal(8, 2)")
                    .HasColumnName("costo");

                entity.Property(e => e.CostoVenta)
                    .HasColumnType("decimal(8, 2)")
                    .HasColumnName("costoVenta");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");

                entity.Property(e => e.Duracion)
                    .HasColumnName("duracion")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Estado).HasColumnName("estado");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Cursos)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CURSOS_USUARIO");
            });

            modelBuilder.Entity<DatosInstructor>(entity =>
            {
                entity.HasKey(e => e.IdDatos)
                    .HasName("PK__DatosIns__B0831DB79877E3F3");

                entity.ToTable("DatosInstructor");

                entity.Property(e => e.IdDatos)
                    .ValueGeneratedNever()
                    .HasColumnName("idDatos");

                entity.Property(e => e.Certificaciones)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("certificaciones");

                entity.Property(e => e.ExperienciaLaboral)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("experienciaLaboral");

                entity.Property(e => e.NivelEstudios)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("nivelEstudios");

                entity.Property(e => e.NoCuentaBancaria)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("noCuentaBancaria");

                entity.Property(e => e.NombreBanco)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombreBanco");

                entity.Property(e => e.NombreCuenta)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombreCuenta");

                entity.Property(e => e.TipoDeCuenta)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("tipoDeCuenta");
            });

            modelBuilder.Entity<Factura>(entity =>
            {
                entity.HasKey(e => e.IdFactura)
                    .HasName("PK__Factura__3CD5687E51995B4C");

                entity.ToTable("Factura");

                entity.Property(e => e.IdFactura)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("idFactura");

                entity.Property(e => e.Fecha)
                    .HasColumnType("datetime")
                    .HasColumnName("fecha");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Total)
                    .HasColumnType("decimal(8, 2)")
                    .HasColumnName("total");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Facturas)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FACTURA_USUARIO");
            });

            modelBuilder.Entity<Leccione>(entity =>
            {
                entity.HasKey(e => e.IdLeccion)
                    .HasName("PK__Leccione__8916A411BF1B8D0F");

                entity.Property(e => e.IdLeccion).HasColumnName("idLeccion");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");

                entity.Property(e => e.Duracion).HasColumnName("duracion");

                entity.Property(e => e.Enlace)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("enlace");

                entity.Property(e => e.IdCurso).HasColumnName("idCurso");

                entity.Property(e => e.Titulo)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("titulo");

                entity.HasOne(d => d.IdCursoNavigation)
                    .WithMany(p => p.Lecciones)
                    .HasForeignKey(d => d.IdCurso)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LECCIONES_CURSOS");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK__Usuarios__645723A620CB2809");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Apellidos)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("apellidos");

                entity.Property(e => e.Clave)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("clave");

                entity.Property(e => e.Correo)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("correo");

                entity.Property(e => e.Estado)
                    .IsRequired()
                    .HasColumnName("estado")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.IdDatosInstructor).HasColumnName("idDatosInstructor");

                entity.Property(e => e.Nit)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nit");

                entity.Property(e => e.NoTarjeta)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("noTarjeta");

                entity.Property(e => e.NoTelefono)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("noTelefono");

                entity.Property(e => e.Nombres)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("nombres");

                entity.Property(e => e.Rol)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("rol");

                entity.HasOne(d => d.IdDatosInstructorNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdDatosInstructor)
                    .HasConstraintName("FK_USUARIOS_DatosInstructor");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
