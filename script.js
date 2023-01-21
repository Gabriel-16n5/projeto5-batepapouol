let userName = {}; 
let promise;


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
   let msg = document.querySelector('.containerPrincipal');
   msg.innerHTML = `
<div class="mensagem">
    <div class="tempo">(09:21:45)</div>
    <div class="user">${userName.name}</div>
    <div class="entraNaSala">entra na sala...</div>
</div>
`
}

function usuarioEmUso(){
    alert('Nome em uso escolha outro');
    cadastroUser();
}