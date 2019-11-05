SQL> CREATE TABLE domicilioFinanzas(
  2  domicilioId CHAR(4) PRIMARY KEY,
  3  calleDomicilio VARCHAR2(15) NOT NULL,
  4  coloniaDomicilio VARCHAR2(15) NOT NULL,
  5  alcaldiaDomicilio VARCHAR2(15) NOT NULL,
  6  codigoPostal NUMBER(5,0) NOT NULL
  7  );

Table created.

SQL> CREATE TABLE proveedorFinanzas(
  2  proveedorId CHAR(4) PRIMARY KEY,
  3  apPatProv VARCHAR2(20) NOT NULL,
  4  apMatProv VARCHAR2(20) NOT NULL,
  5  claveProv VARCHAR2(20) NOT NULL,
  6  descripcionProv VARCHAR2(200) NOT NULL,
  7  nombreProv VARCHAR2(20) NOT NULL,
  8  domicilioId CHAR(4) NOT NULL,
  9  CONSTRAINTS fkProvDom FOREIGN KEY(domicilioId)
 10  REFERENCES domicilioFinanzas
 11  );

Table created.

SQL> CREATE TABLE comprobanteFinanzas(
  2  comprobanteId CHAR(4) PRIMARY KEY,
  3  tipoComprobante VARCHAR(10) NOT NULL,
  4  fechaGeneracion DATE NOT NULL,
  5  proveedorId CHAR(4) NOT NULL,
  6  CONSTRAINTS fkComprobanteProveedor FOREIGN KEY(proveedorId)
  7  REFERENCES proveedorFinanzas
  8  );

Table created.

SQL> CREATE TABLE mercanciaFinanzas(
  2  mercanciaId CHAR(4) PRIMARY KEY,
  3  stock NUMERIC(5,0) NOT NULL,
  4  precio NUMERIC(7,2) NOT NULL,
  5  nombreMerc VARCHAR2(50) NOT NULL,
  6  descMerc VARCHAR2(200) NOT NULL,
  7  proveedorId CHAR(4) NOT NULL,
  8  CONSTRAINTS fkMercanciaProveedor FOREIGN KEY(proveedorId)
  9  REFERENCES proveedorFinanzas
 10  );

Table created.

SQL> CREATE TABLE ejemplarFinanzas(
  2  mercanciaId CHAR(4) PRIMARY KEY,
  3  numEjemplar NUMERIC(5) NOT NULL,
  4  CONSTRAINTS fkEjemplarMercancia FOREIGN KEY(mercanciaId)
  5  REFERENCES mercanciaFinanzas
  6  );

Table created.

SQL> CREATE TABLE sucursalFinanzas(
  2  sucursalId CHAR(4) PRIMARY KEY,
  3  claveSuc VARCHAR2(10) NOT NULL,
  4  nombreSuc VARCHAR2(30)  NOT NULL,
  5  numSucursal NUMERIC(5,0) NOT NULL,
  6  domicilioId CHAR(4) NOT NULL,
  7  CONSTRAINTS fkSucursalDomicilio FOREIGN KEY(domicilioId)
  8  REFERENCES domicilioFinanzas
  9  );

Table created.

SQL> CREATE TABLE mercanciaSucursal(
  2  mercanciaId CHAR(4) NOT NULL,
  3  sucursalId CHAR(4) NOT NULL,
  4  CONSTRAINTS fkMercancia FOREIGN KEY(mercanciaId)
  5  REFERENCES mercanciaFinanzas,
  6  CONSTRAINTS fkSucursal FOREIGN KEY(sucursalId)
  7  REFERENCES sucursalFinanzas,
  8  CONSTRAINTS pkSucursalMercancia PRIMARY KEY(mercanciaId,sucursalId)
  9  );

Table created.
