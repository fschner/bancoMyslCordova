//RECUPERAR DADOS LOCALSTORAGE
if(localStorage.getItem('dataUser')){
    //PEGAR O VALOR
    var dados = localStorage.getItem('dataUser');
    //CONVERTER PARA OBJETO
    var obj = JSON.parse(dados);

    //ALIMENTAR OS CAMPOS INPUT
    $("#edit_id").val(obj.id);
    $("#edit_nome").val(obj.nome);
    $("#edit_email").val(obj.email);

}

//CLICAR NO BTN ATUALIZA
//ENVIAR DADOS AO CLICAR NO BOTAO
$("#btnAtualiza").click(function () {
    //RECUPERAR DADOS DOS CAMPOS

    var nome = $("#edit_nome").val();
    var email = $("#edit_email").val();
    var id = $("#edit_id").val();

    //ENVIAR DADOS PARA O BANCO USAMOS FETCH

    fetch('http://192.168.3.29/mysqlapi/atualizar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            nome: nome,
            email: email,
            id: id

        })

    })

        //TRATANDO O RETORNO DO BACKEND

        .then(response => response.json())
        .then(dados => {
            console.log(dados);
            if (dados.sucesso) {
                app.dialog.alert('Atualizado com Sucesso!', 'Sucesso!', function () {
                   //ENVIAR PARA UMA ROTA
                   app.views.main.router.navigate('/index/');
                })
            } else {
                app.dialog.alert('Falha ao Atualizar!', 'Falha');
            }


        })

        .catch(error => {
            console.error(error);
        })


});
