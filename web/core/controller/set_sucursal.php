<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once("../model/Conexion_BD.php");
require_once("../model/Sucursal.php");
require_once("../model/Domicilio.php");
$Sucursal = new Sucursal();
$Domicilio = new Domicilio();

$clv = $_POST['clv_s'];
$nom = $_POST['nom_s'];
$num_s = $_POST['num_s'];
$calle = $_POST['calle_p'];
$colonia = $_POST['col_p'];
$alcaldia = $_POST['alcaldia_p'];
$cp = $_POST['cp_p'];

$dom_id = $Domicilio->insertar_un_domicilo($calle, $colonia, $alcaldia, $cp);

$resp = $Sucursal->insertar_sucursal($clv, $nom, $num_s, $dom_id);
echo(json_encode(array('resultado'=>$resp)));
