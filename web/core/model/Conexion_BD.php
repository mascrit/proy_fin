<?php
class Conexion extends PDO{
    protected $conn;
    function __construct(){
        try{
            $this->connn = parent::__construct('pgsql:host=localhost;dbname=inventario;port=5432','finanzas','finanzas');
        }catch(PDOException $ex){
            echo 'Error: '.$ex->getMessage();
        }
    }
}
?>
