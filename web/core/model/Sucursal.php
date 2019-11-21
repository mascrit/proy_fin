<?php

class Sucursal{
    private $db;
    function __construct(){
        $this->db = new Conexion();
    }

     function ver_sucursales(){
         $query = "select s.sucursalId as sucursal_id,s.nombreSuc as nombre_sucursal,s.claveSuc as clave_sucursal,s.numSucursal as numero_sucursal,d.calledomicilio as calle,d.coloniaDomicilio as colonia,d.alcaldiaDomicilio as alcaldia,d.codigoPostal as cp from sucursalfinanzas as s join domiciliofinanzas as d using(domicilioId)";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    function insertar_sucursal($clave,$nombreSuc,$numSucursal,$domicilioId){
        $query = 'insert into sucursalfinanzas (claveSuc, nombreSuc, numSucursal, domicilioId)values (:clave,:nombreSuc,:numSucursal,:domicilioId)';
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':clave', $clave);
        $stmt->bindParam(':nombreSuc', $nombreSuc);
        $stmt->bindParam(':numSucursal', $numSucursal);
        $stmt->bindParam(':domicilioId', $domicilioId);
        return $stmt->execute();
    }
    
    function eliminar_sucursal_id($id){
        $query = 'delete from sucursalfinanzas where sucursalid=:id';
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}
?>
