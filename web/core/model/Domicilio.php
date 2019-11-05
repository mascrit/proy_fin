<?php
class Domicilio {
    private $db;
    function __construct(){
        $this->db = new Conexion();
    }

    function insertar_un_domicilo($calledomicilio, $coloniadomicilio,
                                  $alcaldiadomicilio, $codigopostal){
        $query = 'insert into domiciliofinanzas(domicilioid, calledomicilio, coloniadomicilio, alcaldiadomicilio, codigopostal) VALUES (default, :calledomicilio , :coloniadomicilio , :alcaldiadomicilio , :codigopostal )';
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':calledomicilio', $calledomicilio);
        $stmt->bindParam(':coloniadomicilio', $coloniadomicilio);
        $stmt->bindParam(':alcaldiadomicilio', $alcaldiadomicilio);
        $stmt->bindParam(':codigopostal', $codigopostal);
        echo $stmt->execute();
        return $this->db->lastInsertId();
    }

    function ver_domicilios(){
        $query = 'select proveedorid as id, appatprov as apellido_paterno, apmatprov as apellido_materno, nombreprov as nombre, calledomicilio as calle, coloniadomicilio as colonia, alcaldiadomicilio as alcaldia, codigopostal as CP from proveedorfinanzas as prov join domiciliofinanzas dom using(domicilioid)';
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
