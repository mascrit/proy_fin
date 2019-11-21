<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once("../model/Conexion_BD.php");
require_once("../model/Sucursal.php");

$Sucursal = new Sucursal();
echo $_POST['sucursal_id'];

$resp = $Sucursal->eliminar_sucursal_id($_POST['sucursal_id']);
echo json_encode(array('resultado'=>$resp));
