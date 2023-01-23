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
    carregarMensagensDoServidor();
}

function escreverNaSalaQuemEntrou(){
    let msg = document.querySelector('.containerPrincipal');
 /*   
    msg.innerHTML = 
`
    <div class="mensagem">
        <div class="tempo">${dadosProcessados[99].time}</div>
        <div class="user">${dadosProcessados[99].from}</div>
        <div class="entraNaSala">${dadosProcessados[99].text}</div>
    </div>
 `
 */
}

function carregarMensagensDoServidor(){
    histórico = document.querySelector('.containerPrincipal');
    for(let i = 0; i<dadosProcessados.length;i++){
        if(dadosProcessados[i].text == ('entra na sala...')||('sai da sala...')){
            histórico.innerHTML +=
            `
                <div data-test="message" class="mensagem box">
                    <div class="tempo">${dadosProcessados[i].time}</div>
                    <div class="user">${dadosProcessados[i].from}</div>
                    <div class="entraNaSala">${dadosProcessados[i].text}</div>
                </div>
            `
            scroll();
        }
        else if(dadosProcessados[i].text != ('sai da sala...')||('entra na sala...')){
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
        else if(dadosProcessados[i].type == ('private_message')){
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
        }/*else{
        histórico.innerHTML +=
        `
            <div data-test="message" class="mensagem box">
                <div class="tempo">${dadosProcessados[i].time}</div>
                <div class="user">${dadosProcessados[i].from}</div>
                <div class="entraNaSala">${dadosProcessados[i].text}</div>
            </div>
        `
        }*/
    }
    controle = dadosProcessados[99].time;
    setInterval(atualizarChat, 3000);
}

function atualizarChat(){
    dadosAtualizados = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    dadosAtualizados.then(dadosMensagensAtualizados);


    histórico = document.querySelector('.containerPrincipal');
        if(controle != dadosProcessados[99].time){
            if(dadosProcessados[99].text == ('entra na sala...')||('sai da sala...')){
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
            }
            else if(dadosProcessados[99].text != ('sai da sala...')||('entra na sala...')){
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
            else if(dadosProcessados[99].type == ('private_message')){
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
            }/*else{
            histórico.innerHTML +=
            `
                <div data-test="message" class="mensagem box">
                    <div class="tempo">${dadosProcessados[99].time}</div>
                    <div class="user">${dadosProcessados[99].from}</div>
                    <div class="entraNaSala">${dadosProcessados[99].text}</div>
                </div>
            `
            }*/
        }
    console.log('att chat');
}

function dadosMensagensAtualizados(dadosBrutos){
    dadosProcessados = dadosBrutos.data;
}

function enviarMensagem(){
    promiseChat = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', mensagemChat);
}

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