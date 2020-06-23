let initialiseUI = function(){

    // botaoInstalar.removeAttribute('hidden');
    // botaoInstalar.addEventListener('click', function(){

    //     deferredInstallPrompt.prompt();

    //     deferredInstallPrompt.userChoice.then((choice) => {

    //         if(choice.outcome === 'accepted'){

    //             console.log("Usuário aceitou a instalação");

    //         }else{

    //             console.log("Usuário não aceitou a instalação");

    //         }

    //     });

    // });

}

window.addEventListener('beforeinstallprompt', gravarEvento);

function gravarEvento(evt){
    deferredInstallPrompt = evt;
}
