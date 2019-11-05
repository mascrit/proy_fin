<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once("../model/Conexion_BD.php");
require_once("../model/Proveedores.php");
require_once("../model/Domicilio.php");
$Proveedores = new Proveedores();
$Domicilio = new Domicilio();

$nombre = $_POST['nombre_p'];
$ap_pat = $_POST['appat_p'];
$ap_mat = $_POST['apmat_p'];
$calle = $_POST['calle_p'];
$colonia = $_POST['col_p'];
$alcaldia = $_POST['alcaldia_p'];
$clave = $_POST['clv_p'];
$desc = $_POST['desc_p'];
$cp = $_POST['cp_p'];

$dom_id = $Domicilio->insertar_un_domicilo($calle, $colonia,
    $alcaldia, $cp);

$resp = $Proveedores->insertar_proveedor($ap_pat,$ap_mat,$clave,
    $desc,$nombre,$dom_id);
echo(json_encode(array('resultado'=>$resp)));
