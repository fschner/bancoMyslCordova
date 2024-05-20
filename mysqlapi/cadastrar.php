<?php
require_once('config.php');


//VERIFICAR SE O METODO E POST

if($_SERVER['REQUEST_METHOD'] === 'POST'){

//RECEBER O JSON 

$inputJSON = file_get_contents('php://input');
$dados = json_decode($inputJSON, true);

//RECUPERAR OS DADOS

    if($dados){
        $nome = $dados['nome'];
        $email = $dados['email'];
        $senha = $dados['senha'];

        //DATE E HORA ATUAL
        $hoje = date('d/m/Y');
        $hora = date('H:i:s');

        //ARMARZENAR NO BD
        $query = "INSERT INTO usuarios (nome, email, senha, data_cadastro, hora_cadastro) VALUES (?,?,?,?,?)";
        $stmt = $conn->prepare($query);
        $result = $stmt->execute([$nome,$email,$senha,$hoje,$hora]);

        //RETORNAR PARA O APP O RESULTADO

        http_response_code($result ? 200 : 400);
        //200 - OK
        //400 - ERRO

        //Mardar info para o App

        echo json_encode(['sucesso' => $result, 'message' => $result ? 'Usuário Cadastrado com Sucesso!' : 'Erro ao Cadastrar Usúario!']);
    }

}

