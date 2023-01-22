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
    console.log('Imprime que está online ainda');
}

function dadosMensagens(dadosBrutos){
    dadosProcessados = dadosBrutos.data;
    escreverNaSalaQuemEntrou();
}

function escreverNaSalaQuemEntrou(){
    let msg = document.querySelector('.containerPrincipal');
    
    msg.innerHTML = 
`
    <div class="mensagem">
        <div class="tempo">${dadosProcessados[99].time}</div>
        <div class="user">${dadosProcessados[99].from}</div>
        <div class="entraNaSala">${dadosProcessados[99].text}</div>
    </div>
 `
 carregarMensagensDoServidor();
}

function carregarMensagensDoServidor(){
    let histórico = document.querySelector('.containerPrincipal');
    for(let i = 0; i<dadosProcessados.length;i++){
        histórico.innerHTML +=
        `
            <div class="mensagem">
                <div class="tempo">${dadosProcessados[i].time}</div>
                <div class="user">${dadosProcessados[i].from}</div>
                <div class="para"> para ${dadosProcessados[i].to}:</div>
                <div class="entraNaSala">${dadosProcessados[i].text}</div>
            </div>
        `
    }
}