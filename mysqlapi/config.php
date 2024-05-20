<?php
//DEFINIR OS CABEÇALHOS DE PERMISSÃO DE ACESSO A API
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// CONECXÃO COM NOSSO BANCO DE DADOS MYSQL
$servidor = 'localhost';
$usuario = 'root';
$password = '';
$banco = 'testemysql';

//CONECXÃO USANDO PDO
try{
    $conn = new PDO("mysql:host=$servidor;dbname=$banco",$usuario,$password);
    $conn ->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
    die('Erro ao se conectar ao banco d dados: '.$e->getMessage());

};
