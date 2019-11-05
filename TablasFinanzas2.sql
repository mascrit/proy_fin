CREATE TABLE domicilioFinanzas(
domicilioId serial PRIMARY KEY,
calleDomicilio VARCHAR(15) NOT NULL,
coloniaDomicilio VARCHAR(15) NOT NULL,
alcaldiaDomicilio VARCHAR(15) NOT NULL,
codigoPostal NUMERIC(5,0) NOT NULL
);

CREATE TABLE proveedorFinanzas(
proveedorId serial PRIMARY KEY,
apPatProv VARCHAR(20) NOT NULL,
apMatProv VARCHAR(20) NOT NULL,
claveProv VARCHAR(20) NOT NULL,
descripcionProv VARCHAR(200) NOT NULL,
nombreProv VARCHAR(20) NOT NULL,
domicilioId integer NOT NULL,
FOREIGN KEY(domicilioId) REFERENCES domicilioFinanzas
);

CREATE TABLE comprobanteFinanzas(
comprobanteId serial PRIMARY KEY,
tipoComprobante VARCHAR(10) NOT NULL,
fechaGeneracion DATE NOT NULL,
proveedorId integer NOT NULL,
FOREIGN KEY(proveedorId) REFERENCES proveedorFinanzas
);

CREATE TABLE mercanciaFinanzas(
mercanciaId serial PRIMARY KEY,
stock NUMERIC(5,0) NOT NULL,
precio NUMERIC(7,2) NOT NULL,
nombreMerc VARCHAR(50) NOT NULL,
descMerc VARCHAR(200) NOT NULL,
proveedorId integer NOT NULL,
FOREIGN KEY(proveedorId) REFERENCES proveedorFinanzas
);

CREATE TABLE ejemplarFinanzas(
mercanciaId integer PRIMARY KEY,
numEjemplar NUMERIC(5) NOT NULL,
FOREIGN KEY(mercanciaId) REFERENCES mercanciaFinanzas
);

CREATE TABLE sucursalFinanzas(
sucursalId serial PRIMARY KEY,
claveSuc VARCHAR(10) NOT NULL,
nombreSuc VARCHAR(30)  NOT NULL,
numSucursal NUMERIC(5,0) NOT NULL,
domicilioId integer NOT NULL,
 FOREIGN KEY(domicilioId) REFERENCES domicilioFinanzas
);

CREATE TABLE mercanciaSucursal(
mercanciaId integer NOT NULL,
sucursalId integer NOT NULL,
FOREIGN KEY(mercanciaId) REFERENCES mercanciaFinanzas,
FOREIGN KEY(sucursalId) REFERENCES sucursalFinanzas,
PRIMARY KEY(mercanciaId,sucursalId)
);
