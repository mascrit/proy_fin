<?php

class Proveedores{
    private $db;
    function __construct(){
        $this->db = new Conexion();
    }

     function ver_proveedores(){
         $query = "select proveedorid as id, appatprov as apellido_paterno, apmatprov as apellido_materno, nombreprov as nombre, calledomicilio as calle, coloniadomicilio as colonia, alcaldiadomicilio as alcaldia, codigopostal as CP from proveedorfinanzas as prov join domiciliofinanzas dom using(domicilioid);";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    function insertar_proveedor($appatprov, $apmatprov, $claveprov,
                                $descripcionprov, $nombreprov, $domicilioid){
        $query = 'insert into proveedorfinanzas(proveedorid, appatprov, apmatprov, claveprov, descripcionprov, nombreprov, domicilioid)
values (default, :appat, :apmat, :clv, :desc, :nom, :domid)';
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':appat', $appatprov);
        $stmt->bindParam(':apmat', $apmatprov);
        $stmt->bindParam(':clv', $claveprov);
        $stmt->bindParam(':desc', $descripcionprov);
        $stmt->bindParam(':nom', $nombreprov);
        $stmt->bindParam(':domid', $domicilioid);
        return $stmt->execute();
    }
    
    function eliminar_proveedor_id($id){
        $query = 'delete from proveedorfinanzas where proveedorfinanzas.proveedorid = :id';
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}
?>
