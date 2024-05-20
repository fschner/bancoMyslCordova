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
        $id = $dados['id'];


        //ARMARZENAR NO BD
        $query = "UPDATE usuarios SET nome=?, email=? WHERE id=?";
        $stmt = $conn->prepare($query);
        $result = $stmt->execute([$nome,$email,$id]);

        //RETORNAR PARA O APP O RESULTADO

        http_response_code($result ? 200 : 400);
        //200 - OK
        //400 - ERRO

        //Mardar info para o App

        echo json_encode(['sucesso' => $result, 'message' => $result ? 'Usuário Atualizado com Sucesso!' : 'Erro ao Atualizar Usúario!']);
    }

}

