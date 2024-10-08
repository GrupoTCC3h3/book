// Seleção de elementos do DOM
let nome = document.querySelector('#iusuario');
let labelNome = document.querySelector('#labelUsuario');
let validNome = false;

let usuario = document.querySelector('#iemail');
let labelUsuario = document.querySelector('#labelEmail');
let validUsuario = false;

let senha = document.querySelector('#isenha');
let labelSenha = document.querySelector('#labelSenha');
let validSenha = false;

let confirmSenha = document.querySelector('#confirmSenha');
let labelConfirmSenha = document.querySelector('#labelConfirmSenha');
let validConfirmSenha = false;

let formCadastro = document.querySelector('#formCadastro');
let msgError = document.querySelector('#msgError');
let msgSuccess = document.querySelector('#msgSuccess');

// Funções de validação
function validarNome() {
    let errorNome = document.getElementById('errorNome');
    if (nome.value.length < 2) {
        errorNome.textContent = 'Insira no mínimo 2 caracteres para o campo nome';
        errorNome.setAttribute('style', 'color: red; font-size: 15px');
        nome.setAttribute('style', 'border-color: red');
        validNome = false;
    } else {
        errorNome.textContent = '';
        nome.setAttribute('style', 'border-color: green');
        validNome = true;
    }
}

function validarEmail() {
    let errorEmail = document.getElementById('errorEmail');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(usuario.value)) {
        errorEmail.textContent = 'Insira um email válido';
        errorEmail.setAttribute('style', 'color: red; font-size: 15px');
        usuario.setAttribute('style', 'border-color: red');
        validUsuario = false;
    } else {
        errorEmail.textContent = '';
        usuario.setAttribute('style', 'border-color: green');
        validUsuario = true;
    }
}

function validarSenha() {
    let errorSenha = document.getElementById('errorSenha');
    if (senha.value.length < 8) {
        errorSenha.textContent = 'Insira no mínimo 8 caracteres para o campo senha';
        errorSenha.setAttribute('style', 'color: red; font-size: 15px');
        senha.setAttribute('style', 'border-color: red');
        validSenha = false;
    } else {
        errorSenha.textContent = '';
        senha.setAttribute('style', 'border-color: green');
        validSenha = true;
    }
}

function validarConfirmSenha() {
    let errorConfirmSenha = document.getElementById('errorConfirmSenha');
    if (senha.value !== confirmSenha.value) {
        errorConfirmSenha.textContent = 'As senhas não conferem';
        errorConfirmSenha.setAttribute('style', 'color: red; font-size: 15px');
        confirmSenha.setAttribute('style', 'border-color: red');
        validConfirmSenha = false;
    } else {
        errorConfirmSenha.textContent = '';
        confirmSenha.setAttribute('style', 'border-color: green');
        validConfirmSenha = true;
    }
}

// Eventos para validação em tempo real
nome.addEventListener('keyup', validarNome);
usuario.addEventListener('keyup', validarEmail);
senha.addEventListener('keyup', validarSenha);
confirmSenha.addEventListener('keyup', validarConfirmSenha);

// Submissão do formulário
formCadastro.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário
    if (validNome && validUsuario && validSenha && validConfirmSenha) {
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
        
        // Verifica se o e-mail já está cadastrado
        const usuarioExistente = listaUser.find(user => user.userCad === usuario.value);
        if (usuarioExistente) {
            msgError.setAttribute('style', 'display: block');
            msgError.innerHTML = '<strong>E-mail já cadastrado!</strong>';
            msgSuccess.innerHTML = '';
            msgSuccess.setAttribute('style', 'display: none');
            return;
        }

        listaUser.push({
            nomeCad: nome.value,
            userCad: usuario.value,
            senhaCad: senha.value
        });

        // Salva o nome e email no localStorage após o cadastro
        salvarUsuarioNoLocalStorage(nome.value, usuario.value);
        
        localStorage.setItem('listaUser', JSON.stringify(listaUser));
        
        msgSuccess.setAttribute('style', 'display: block');
        msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>';
        msgError.setAttribute('style', 'display: none');
        msgError.innerHTML = '';
        
        setTimeout(() => {
            window.location.href = '../login/login.html'; // Redireciona após o cadastro
        }, 3000);
    } else {
        msgError.setAttribute('style', 'display: block');
        msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
        msgSuccess.innerHTML = '';
        msgSuccess.setAttribute('style', 'display: none');
    }
});

// Função para salvar nome e email no localStorage
function salvarUsuarioNoLocalStorage(nome, email) {
    const listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
    
    // Armazena o usuário atual no localStorage
    const usuarioAtual = { nome, email };
    localStorage.setItem('usuarioAtual', JSON.stringify(usuarioAtual));
}

// Funções de navegação
function TelaLogin() {
    window.document.location.href = "../login/login.html"; // Ajuste o caminho se necessário
}

function voltarTelaInicial() {
    window.document.location.href = "../index.html"; // Ajuste o caminho se necessário
}
