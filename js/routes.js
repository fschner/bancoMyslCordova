//INICIALIZAÇÃO DO F7 QUANDO DISPOSITIVO ESTÁ PRONTO
document.addEventListener('deviceready', onDeviceReady, false);
var $$ = Dom7;
var app = new Framework7({
  // App root element
  el: '#app',
  // App Name
  name: 'Lista de Tarefas',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: true,
  },
  dialog: {
    buttonOk: 'Sim',
    buttonCancel: 'Cancelar',
  },
  touch:{
    tapHold: true
  },
  // Add default routes
  routes: [
    {
      path: '/index/',
      url: 'index.html',
      on: {
        pageInit: function (event, page) {
          //IMPORTAR COMANDOS DA PAGINA INDEX
          $.getScript('js/index.js');
        },
      }
    },
    {
      path: '/editar/',
      url: 'editar.html',
      on: {
        pageInit: function (event, page) {
          //IMPORTAR COMANDOS DA PAGINA EDITAR
          $.getScript('js/editar.js');
        },
      }
    },
  ],
  // ... other parameters
});

// Para testes locais
var mainView = app.views.create('.view-main', { url: '/index/' });

//EVENTO PARA SABER O ITEM DO MENU ATUAL
app.on('routeChange', function (route) {

  var currentRoute = route.url;
  console.log(currentRoute);
  document.querySelectorAll('.item-panel').forEach(function (el) {
    el.classList.remove('active');
  });
  var targetEl = document.querySelector('.item-panel[href="' + currentRoute + '"]');
  if (targetEl) {
    targetEl.classList.add('active');
  }
});



function onDeviceReady() {
  //Quando estiver rodando no celular
  var mainView = app.views.create('.view-main', { url: '/index/' });

  //COMANDO PARA "OUVIR" O BOTAO VOLTAR NATIVO DO ANDROID 	
  document.addEventListener("backbutton", function (e) {

    if (mainView.router.currentRoute.path === '/index/') {
      e.preventDefault();
      app.dialog.confirm('Deseja sair do aplicativo?', function () {
        navigator.app.exitApp();
      });
    } else {
      e.preventDefault();
      mainView.router.back({ force: true });
    }
  }, false);

}


