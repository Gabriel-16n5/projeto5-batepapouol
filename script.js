let userName = {}; 
let promise;
let promiseOnline;
let dados;
let dadosProcessados;

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
    setInterval(manterOnline, 5000);
}

function deuRuim(){
    alert('deu Ruim');
    usuarioEmUso();
}

function entrarNaSala(){
    dados = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    dados.then(dadosMensagens);
}

function usuarioEmUso(){
    alert('Nome em uso escolha outro');
    cadastroUser();
}

function manterOnline(){
    promiseOnline = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', userName);
    console.log('foi');
}

function dadosMensagens(dadosBrutos){
    dadosProcessados = dadosBrutos.data;
    escreverNaSala();
}

function escreverNaSala(){
    let msg = document.querySelector('.containerPrincipal');
    
    msg.innerHTML = 
`
    <div class="mensagem">
        <div class="tempo">${dadosProcessados[99].time}</div>
        <div class="user">${dadosProcessados[99].from}</div>
        <div class="entraNaSala">${dadosProcessados[99].text}</div>
    </div>
 `
}