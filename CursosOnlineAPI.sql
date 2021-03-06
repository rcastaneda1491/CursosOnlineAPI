-- use EEEG
-- drop database CURSOS_ONLINE_API

CREATE DATABASE CURSOS_ONLINE_API;
GO
USE CURSOS_ONLINE_API;
GO
CREATE TABLE DatosInstructor(
	idDatos	int NOT NULL PRIMARY KEY,

	-- DATOS INSTRUCTORES
	nivelEstudios	varchar(150),
	certificaciones	varchar(200),
	experienciaLaboral	varchar(200),

	-- DATOS BANCARIOS
	nombreBanco	varchar(100),
	nombreCuenta	varchar(100),
	tipoDeCuenta	varchar(100),
	noCuentaBancaria	varchar(100)
);
GO
CREATE TABLE Usuarios(
	idUsuario	int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	nombres		varchar(200) NOT NULL,
	apellidos	varchar(200) NOT NULL,
	correo		varchar(200) NOT NULL,
	noTelefono	varchar(50) NOT NULL,
	nit			varchar(50) NOT NULL,
	noTarjeta	varchar(50),
	clave		varchar(50) NOT NULL,
	rol			varchar(50) NOT NULL, -- adminitrador|estudiante|instructores
	estado		bit DEFAULT(1) NOT NULL,
	idDatosInstructor int,
	CONSTRAINT FK_USUARIOS_DatosInstructor FOREIGN KEY(idDatosInstructor) 
		REFERENCES DatosInstructor(idDatos)
);
GO
CREATE TABLE Cursos(
	idCurso		int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	nombre		varchar(200) NOT NULL,
	descripcion	varchar(200) NOT NULL,
	duracion	int DEFAULT(0), -- Se maneja por minutos
	costo		decimal(8,2) NOT NULL,  -- Costo que le asignara el instructor
	costoVenta	decimal(8,2) NOT NULL, -- Costo al Usuario
	cantidadEstudiantes	int DEFAULT(0),
	estado		bit  NOT NULL,
	idUsuario	int NOT NULL,
	CONSTRAINT FK_CURSOS_USUARIO FOREIGN KEY(idUsuario) 
		REFERENCES Usuarios(idUsuario)
);
GO
CREATE TABLE Lecciones(
	idLeccion	int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	idCurso		int NOT NULL,
	titulo		varchar(100) NOT NULL,
	descripcion	varchar(100) NOT NULL,
	duracion	INT NOT NULL,
	enlace		varchar(500) NOT NULL,
	CONSTRAINT FK_LECCIONES_CURSOS FOREIGN KEY(idCurso) 
		REFERENCES Cursos(idCurso)
);
GO
CREATE TABLE Factura(
	idFactura	 VARCHAR(255) NOT NULL PRIMARY KEY,
	idUsuario	int NOT NULL,
	total		decimal(8,2),
	fecha		DATETIME,
	CONSTRAINT FK_FACTURA_USUARIO FOREIGN KEY(idUsuario) 
		REFERENCES Usuarios(idUsuario),
);
GO
CREATE TABLE Compra( -- Funcionaria como "Tabla Detalle"
	idUsuario	int NOT NULL,
	idCurso		int NOT NULL,
	idFactura	VARCHAR(255)  NOT NULL,
	PRIMARY KEY(idFactura,idCurso),
	CONSTRAINT FK_COMPRAS_USUARIO FOREIGN KEY(idUsuario) 
		REFERENCES Usuarios(idUsuario),
	CONSTRAINT FK_COMPRAS_CURSOS FOREIGN KEY(idCurso) 
		REFERENCES Cursos(idCurso),
	CONSTRAINT FK_COMPRA_FACTURA FOREIGN KEY(idFactura) 
		REFERENCES Factura(idFactura)
);
GO
CREATE TABLE CarritoCompra(
	idUsuario	int NOT NULL,
	idCurso		int NOT NULL
	PRIMARY KEY(idUsuario,idCurso),
	CONSTRAINT FK_COMPRASCARRITO_USUARIO FOREIGN KEY(idUsuario) 
		REFERENCES Usuarios(idUsuario),
	CONSTRAINT FK_COMPRASCARRITO_CURSOS FOREIGN KEY(idCurso) 
		REFERENCES Cursos(idCurso)
);
GO

CREATE TABLE Comentario(
	idComentario	int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	idLeccion		int NOT NULL,
	idUsuarioEstudiante		int NOT NULL,
	idUsuarioInstructor		int NOT NULL,
	mensaje					varchar(300) NOT NULL,
	respuesta				varchar(300) DEFAULT('Sin respuesta'),
	CONSTRAINT FK_COMENTARIO_LECCION FOREIGN KEY(idLeccion) 
		REFERENCES Lecciones(idLeccion),
	CONSTRAINT FK_COMENTARIOEstudiante_USUARIO FOREIGN KEY(idUsuarioEstudiante) 
		REFERENCES Usuarios(idUsuario),
	CONSTRAINT FK_COMENTARIOInstructor_USUARIO FOREIGN KEY(idUsuarioInstructor) 
		REFERENCES Usuarios(idUsuario),
);

INSERT INTO Usuarios(nombres,apellidos,correo,noTelefono,nit,clave,rol)
	VALUES('admin','admin','admin@admin.com','5896586','12585','12345','administrador');
select * from Usuarios;
select * from DatosInstructor
select * from Compra;

-- Limpieza de la base de datos
delete from DatosInstructor;
delete from Usuarios;
delete from Cursos;
delete from Lecciones;
delete from Factura;
delete from Compra;
delete from CarritoCompra;
delete from Comentario;

select * from Usuarios