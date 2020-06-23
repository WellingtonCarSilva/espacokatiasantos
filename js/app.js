let deferredInstallPrompt = null;
const botaoInstalar = document.getElementById('btnInstalar');

let initialiseUI = function(){
   
    if (!window.matchMedia('(display-mode: standalone)').matches) {
      
        botaoInstalar.removeAttribute('hidden');
        botaoInstalar.addEventListener('click', function(){

            deferredInstallPrompt.prompt();

            deferredInstallPrompt.userChoice.then((choice) => {

                if(choice.outcome === 'accepted'){
                    botaoInstalar.setAttribute('hidden', 'true');
                    console.log("Usuário aceitou a instalação");

                }else{

                    console.log("Usuário não aceitou a instalação");

                }

            });

        });
    }
}

window.addEventListener('beforeinstallprompt', gravarEvento);

function gravarEvento(evt){
    deferredInstallPrompt = evt;
}

var ajax = new XMLHttpRequest();

ajax.open("GET", "./dados.json", true);

ajax.send();

ajax.onreadystatechange = function(){
    var conteudo = document.getElementById('Conteudo');

    if(ajax.readyState == 4 && ajax.status == 200){

        var data = ajax.responseText;

        var data_json = JSON.parse(data);

        if(data_json.length > 1){
            var html_conteudo = "<ul class='list-group'>";

            for(var i=0; i < data_json.length; i++){
                html_conteudo += "<li class='list-group-item'>" + data_json[i].Nome + 
                    "<span class='badge'>"+data_json[i].Valor+"</span></li>";
            }
            html_conteudo += "</ul>";
            conteudo.innerHTML = html_conteudo;
        }
    }
}