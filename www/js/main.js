let notificacoesRecebidas = JSON.parse(localStorage.getItem('notificacoes')) || [];

setInterval(() => {

    console.log('-- verificaNotificacoes --')

    let notificacoesGuardadas = JSON.parse(localStorage.getItem('notificacoes')) || [];

    if(notificacoesGuardadas.length != notificacoesRecebidas.length){
        notificacoesRecebidas = notificacoesGuardadas;
        atualizarNotificacoesNaTela();
    }

}, 2000);

function atualizarNotificacoesNaTela(){

    let containerElement = document.getElementById('notificacaoContainer');

    containerElement.innerHTML = '';

    notificacoesRecebidas.map(notificacao => {

        let newElement = document.createElement('p');

        newElement.append(JSON.stringify(notificacao));

        containerElement.append(newElement);

    });

}

function logarTokenNoConsole(){

    console.log('-- [tokenFirebase] --', localStorage.getItem('firebaseToken'));

}

function logarNotificacoesDoLocalStorageNoConsole(){

    console.log(localStorage.getItem('notificacoes'));

}

function limparNotificacoesDoLocalStorage(){

    localStorage.removeItem('notificacoes');

}

app.initialize();
atualizarNotificacoesNaTela();
