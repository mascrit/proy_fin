<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
session_start();
require_once("../model/Conexion_BD.php");
require_once("../model/Sucursal.php");
$Sucursal = new Sucursal();
$row = $Sucursal->ver_sucursales();
echo(json_encode($row));
