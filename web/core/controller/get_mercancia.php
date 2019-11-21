<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once "../model/Conexion_BD.php";
require_once "../model/Mercancia.php";

$Mercancia = new Mercancia();

$row = $Mercancia->get_mercancia();
echo (json_encode($row));
