<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
session_start();
require_once("../model/Conexion_BD.php");
require_once("../model/Proveedores.php");
$Proveedores = new Proveedores();
$row = $Proveedores->ver_proveedores();
echo(json_encode($row));
