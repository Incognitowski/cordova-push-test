var app = {
    initialize: function () {
        console.log('-- initialize --');
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        console.log('-- onDeviceReady --');
        app.setupPush();
    },
    setupPush: function () {
        console.log('-- setupPush --');

        var push = PushNotification.init({
            "android": {
                "clearNotifications": false
            }
        });

        push.on('registration', data => {

            console.log('-- registrou token firebase -- ', data, (new Date()).toISOString());
            localStorage.setItem('firebaseToken', data.registrationId);

        });

        push.on('error', e => {
            console.warn('-- erro ao registrar token firebase -- ', e, (new Date()).toISOString());
        });

        push.on('notification', data => {

            console.log(' -- [recebi notificação ] ' + moment().utc(-3).toISOString() + ' -- ', data);

            _mostrar_notificacao = true;
            
            acordarCelular();

            persistirDadosDaNotificacao(data);

        });

        function acordarCelular(){

            // marcos pediu pra testar sem isso
            cordova.plugins.snBatteryOptimization.moveToForeground("moveToForeground", function (response) {
                console.log('sucess softniels.moveToForeground: ' + response);
            }, function (error) {
                console.log('error softniels.moveToForeground: ' + error);
            });
            cordova.plugins.backgroundMode.moveToForeground();
            cordova.plugins.backgroundMode.unlock();
            cordova.plugins.backgroundMode.isScreenOff(function (bool) {
                console.log('isScreenOff: ' + bool);
            });

        }

        function persistirDadosDaNotificacao(dados){

            let notificacoesExistentes = JSON.parse(localStorage.getItem('notificacoes')) || [];

            notificacoesExistentes.push(dados);

            localStorage.setItem('notificacoes', JSON.stringify(notificacoesExistentes));

        }

    },
};
