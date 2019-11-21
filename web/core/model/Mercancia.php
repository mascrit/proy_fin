<?php

class Mercancia{
    private $db;
    function __construct()
    {
        $this->db = new Conexion();
    }

    function get_mercancia()
    {
        $query  = "select s.clavesuc as clave_sucursal,s.nombresuc as nombre_sucursal, m.mercanciaid as id_mercancia, m.nombremerc as nombre_mercancia,m.stock as stock,m.precio as precio,m.descmerc as descripcion ";
        $query .= "from mercanciafinanzas as m ";
        $query .= "join mercanciasucursal using(mercanciaid)  ";
        $query .= "join sucursalfinanzas  as s using(sucursalid) ";
        $query .= "join domiciliofinanzas as d using(domicilioid)";

        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function eliminar_mercancia($id)
    {
        $query = 'delete from mercanciaFinanzas where mercanciaId=:id';
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
    
    function get_by_id($id)
    {
        $query  = "select s.clavesuc as clave_sucursal,s.nombresuc as nombre_sucursal, m.mercanciaid as id_mercancia, m.nombremerc as nombre_mercancia,m.stock as stock,m.precio as precio,m.descmerc as descripcion ";
        $query .= "from mercanciafinanzas as m ";
        $query .= "join mercanciasucursal using(mercanciaid)  ";
        $query .= "join sucursalfinanzas  as s using(sucursalid) ";
        $query .= "join domiciliofinanzas as d using(domicilioid)";
        $query .= "where m.mercanciaId = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch();
    }

    function update_stock($id,$stock)
    {
        $query = 'update mercanciafinanzas set stock=:stock where mercanciaid=:id';
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id',$id);
        $stmt->bindParam(':stock', $stock);
        return $stmt->execute();
        
    }

    function set_mercancia($cls_s,$nom_s,$nom_s,$stock_m,$precio_m,$desc_m)
    {
        
    }
}
?>
