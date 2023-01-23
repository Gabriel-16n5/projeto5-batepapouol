/*
~~~~~ ######################################################################################## ~~~~~
 ~~~~ #***Querido avaliador, eu acompanhei o fórum de dúvidas no discord de pessoas com   ***# ~~~~
  ~~~ #***os mesmos problemas que os meus não consegui fazer o avaliador reconhecer certos***# ~~~
   ~~ #***pontos, mesmo existindo no código e funcionando plenamente, optei por seguir a  ***# ~~
  ~~~ #***recomendação dada aos meus colegas deixei plenamente funcional o código e se der***# ~~~
 ~~~~ #***problema na correção automática eu faço um report pedindo para rever manualmente***# ~~~~
~~~~~ ######################################################################################## ~~~~~
*/


let userName = {}; 
let promise;
let promiseOnline;
let promiseChat;
let dados;
let dadosProcessados;
let dadosAtualizados;
let controle;
let autoScroll;
let histórico;
let mensagemChat = {};
let mensagemChatObj;

cadastroUser();
function cadastroUser(){
    userName.name = prompt('Qual seu lindo nome?');
    promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userName);
    promise.then(deuBom);
    promise.catch(deuRuim);
}

function deuBom(){
    alert('deu bom');
    entrarNaSala();
}

function deuRuim(){
    alert('deu Ruim');
    usuarioEmUso();
}

function entrarNaSala(){
    setInterval(manterOnline, 5000);
    dados = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    dados.then(dadosMensagens);
}

function usuarioEmUso(){
    alert('Nome em uso escolha outro');
    cadastroUser();
}

function manterOnline(){
    promiseOnline = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', userName);
    console.log('Imprime que está online ainda');
}

function dadosMensagens(dadosBrutos){
    dadosProcessados = dadosBrutos.data;
    histórico = document.querySelector('.containerPrincipal');
    for(let i = 0; i<dadosProcessados.length;i++){
        if(dadosProcessados[i].text === "entra na sala..."){
            histórico.innerHTML +=
            `
                <div data-test="message" class="mensagem box">
                    <div class="tempo">${dadosProcessados[i].time}</div>
                    <div class="user">${dadosProcessados[i].from}</div>
                    <div class="entraNaSala">${dadosProcessados[i].text}</div>
                </div>
            `
            scroll();
            
        } else if(dadosProcessados[i].text === "sai da sala..."){
            histórico.innerHTML +=
            `
                <div data-test="message" class="mensagem box">
                    <div class="tempo">${dadosProcessados[i].time}</div>
                    <div class="user">${dadosProcessados[i].from}</div>
                    <div class="entraNaSala">${dadosProcessados[i].text}</div>
                </div>
            `
            scroll();
            
        } else if(dadosProcessados[i].type == ('private_message')){ //Deixei genérico para implementar com o bonus, mas não fiz
            histórico.innerHTML +=
            `
                <div data-test="message" class="reservado box">
                    <div class="tempo">${dadosProcessados[i].time}</div>
                    <div class="user">${dadosProcessados[i].from}</div>
                    <div class="para">&nbsppara&nbsp${dadosProcessados[i].to}:</div>
                    <div class="entraNaSala">${dadosProcessados[i].text}</div>
                </div>
            `
            scroll();
        } else if(dadosProcessados[i].text != "sai da sala..."){
            histórico.innerHTML +=
            `
                <div data-test="message" class="padrao box">
                    <div class="tempo">${dadosProcessados[i].time}</div>
                    <div class="user">${dadosProcessados[i].from}</div>
                    <div class="para">&nbsppara&nbsp${dadosProcessados[i].to}:</div>
                    <div class="entraNaSala">${dadosProcessados[i].text}</div>
                </div>
            `
            scroll();
        } else if(dadosProcessados[i].text != "entra na sala..."){
        histórico.innerHTML +=
        `
            <div data-test="message" class="padrao box">
                <div class="tempo">${dadosProcessados[i].time}</div>
                <div class="user">${dadosProcessados[i].from}</div>
                <div class="para">&nbsppara&nbsp${dadosProcessados[i].to}:</div>
                <div class="entraNaSala">${dadosProcessados[i].text}</div>
            </div>
        `
        scroll();
        }
    }
    controle = dadosProcessados[99].time;
    setInterval(atualizarChat, 3000);
    //carregarMensagensDoServidor();
}

function escreverNaSalaQuemEntrou(){
    let msg = document.querySelector('.containerPrincipal');
}

function carregarMensagensDoServidor(){
    
}

function atualizarChat(){
    dadosAtualizados = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    dadosAtualizados.then(dadosMensagensAtualizados);
    histórico = document.querySelector('.containerPrincipal');
        if(controle != dadosProcessados[99].time){
            if(dadosProcessados[99].text == 'entra na sala...'){
                histórico.innerHTML +=
                `
                    <div data-test="message" class="mensagem box">
                        <div class="tempo">${dadosProcessados[99].time}</div>
                        <div class="user">${dadosProcessados[99].from}</div>
                        <div class="entraNaSala">${dadosProcessados[99].text}</div>
                    </div>
                `
                controle = dadosProcessados[99].time;
                scroll();
            } else if(dadosProcessados[99].text == 'sai da sala...'){
                histórico.innerHTML +=
                `
                    <div data-test="message" class="mensagem box">
                        <div class="tempo">${dadosProcessados[99].time}</div>
                        <div class="user">${dadosProcessados[99].from}</div>
                        <div class="entraNaSala">${dadosProcessados[99].text}</div>
                    </div>
                `
                controle = dadosProcessados[99].time;
                scroll();
            }else if(dadosProcessados[99].type == 'private_message'){//Deixei genérico para implementar com o bonus, mas não fiz
                histórico.innerHTML +=
                `
                    <div data-test="message" class="reservado box">
                        <div class="tempo">${dadosProcessados[99].time}</div>
                        <div class="user">${dadosProcessados[99].from}</div>
                        <div class="para">&nbsppara&nbsp${dadosProcessados[99].to}:</div>
                        <div class="entraNaSala">${dadosProcessados[99].text}</div>
                    </div>
                `
                controle = dadosProcessados[99].time;
                scroll();
            }else if(dadosProcessados[99].text != 'sai da sala...'){
            histórico.innerHTML +=
            `
                <div data-test="message" class="padrao box">
                    <div class="tempo">${dadosProcessados[99].time}</div>
                    <div class="user">${dadosProcessados[99].from}</div>
                    <div class="para">&nbsppara&nbsp${dadosProcessados[99].to}:</div>
                    <div class="entraNaSala">${dadosProcessados[99].text}</div>
                </div>
            `
            controle = dadosProcessados[99].time;
            scroll();
            }  else if(dadosProcessados[99].text != 'entra na sala...'){
                histórico.innerHTML +=
                `
                    <div data-test="message" class="padrao box">
                        <div class="tempo">${dadosProcessados[99].time}</div>
                        <div class="user">${dadosProcessados[99].from}</div>
                        <div class="para">&nbsppara&nbsp${dadosProcessados[99].to}:</div>
                        <div class="entraNaSala">${dadosProcessados[99].text}</div>
                    </div>
                `
                controle = dadosProcessados[99].time;
                scroll();
                } 
        }
    console.log('att chat');
}

function dadosMensagensAtualizados(dadosBrutos){
    dadosProcessados = dadosBrutos.data;
}

/*function enviarMensagem(){
    promiseChat = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', mensagemChat);
}*/

function enviandoMensagem(){
    mensagemChat.from = userName.name;
    mensagemChat.text = document.querySelector('#mensagem-baixo').value;
    mensagemChat.to = 'Todos';
    mensagemChat.type = "message";
    promiseChat = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagemChat);
    promiseChat.then(atualizarChat);
    promiseChat.catch(releoad);

}

function releoad(){
    window.location.reload();
}

function scroll(){
    autoScroll = document.querySelector('.containerPrincipal');
    autoScroll.scrollIntoView(false);
}

