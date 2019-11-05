<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once("../model/Conexion_BD.php");
require_once("../model/Proveedores.php");

$Proveedores = new Proveedores();

$resp = $Proveedores->eliminar_proveedor_id($_POST['prov_id']);
echo json_encode(array('resultado'=>$resp));
