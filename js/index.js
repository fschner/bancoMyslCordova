//METODO PUXAR DADOS
function puxarDadosRemotos() {
    fetch('http://192.168.3.29/mysqlapi/get-users.php')

        .then(response => response.json())
        .then(dados => {
            console.log(dados);


            //VARIFICAR O TAMANHO DOS DADOS
            var tamanho = dados.length;

            $("#conteudo").empty();


            //NÃO TENHO USUARIO
            if (tamanho == 0) {
                $("#conteudo").html(`<div class="card card-outline">
        <div class="card-content card-content-padding">
            Nenhum usuário por enquanto...
        </div>
    </div>`);
            } else {
                //TEM ALGUM USUARIO
                $("#conteudo").html(`
                <div class="list list-outline-ios list-strong-ios list-dividers-ios">
                <ul id="listaUsuarios">
                </ul>
            </div>
                
                `);
                //LAÇO DE REPETIÇÃO PARA RECEBER ARRAY DE DADOS
                $.each(dados, function (index, item) {
                    var nome = item.nome;
                    var email = item.email;
                    var id = item.id;

                    $("#listaUsuarios").append(` 
                    <li>
                    <a href="#" data-id="${id}" data-nome="${nome}" data-email="${email}" class="usuario link item-link item-content">
                        <div class="item-inner">
                            <div class="item-title">
                                <div class="item-header">${email}</div>
                                ${nome}
                            </div>
                            <div class="item-after">Editar</div>
                        </div>
                    </a>
                </li>
                
                `)

                })

                $(".usuario").click(function () {
                    var id = $(this).attr('data-id');
                    var nome = $(this).attr('data-nome'); 
                    var email = $(this).attr('data-email');
                
                //MONTAMOS OBJETO
                    var dados = {
                        id:  id,
                        nome: nome,
                        email: email
                    }

                    //ARMARZENANDO LOCALMENTE OS DADOS
                    localStorage.setItem('dataUser', JSON.stringify(dados));
                
                    //ENVIAR PARA UMA ROTA
                    app.views.main.router.navigate('/editar/');


                
                });


            }


        })
        .catch(error => {
            console.error(error);
        })
}

puxarDadosRemotos();

//ENVIAR DADOS AO CLICAR NO BOTAO
$("#btnCadastro").click(function () {
    //RECUPERAR DADOS DOS CAMPOS

    var nome = $("#nome").val();
    var email = $("#email").val();
    var senha = $("#senha").val();

    //ENVIAR DADOS PARA O BANCO USAMOS FETCH

    fetch('http://192.168.3.29/mysqlapi/cadastrar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            nome: nome,
            email: email,
            senha: senha

        })

    })

        //TRATANDO O RETORNO DO BACKEND

        .then(response => response.json())
        .then(dados => {
            console.log(dados);
            if (dados.sucesso) {
                app.dialog.alert('Cadastro com Sucesso!', 'Sucesso!', function () {
                    $("#nome").val('');
                    $("#email").val('');
                    $("#senha").val('');
                    $("#repete_senha").val('');
                    puxarDadosRemotos();
                })
            } else {
                app.dialog.alert('Falha ao Cadastrar!', 'Falha');
            }


        })

        .catch(error => {
            console.error(error);
        })


});
