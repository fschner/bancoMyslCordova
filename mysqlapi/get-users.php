<?php
require_once('config.php');

//VERIFICAR SE O METODO E GET

if($_SERVER['REQUEST_METHOD'] === 'GET'){

// SOLICITAR AO BANCO PARA PEGAR DADOS DA TABELA
$query = "SELECT * FROM usuarios";
$stmt = $conn->prepare($query);
$stmt->execute();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

//RESPONDER PARA NOSSO APP

http_response_code($users ? 200 : 400);
//200 - OK
//400 - ERRO

//RESPOSTA
echo json_encode($users);


}
