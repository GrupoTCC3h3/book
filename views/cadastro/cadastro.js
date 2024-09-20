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

nome.addEventListener('keyup', () => {
  let errorNome = document.getElementById('errorNome');
  if (nome.value.length < 2) {
    errorNome.textContent = 'Insira no mínimo 2 caracteres para o campo nome';
    nome.setAttribute('style', 'border-color: red');
    validNome = false;
  } else {
    errorNome.textContent = '';
    nome.setAttribute('style', 'border-color: green');
    validNome = true;
  }
});

usuario.addEventListener('keyup', () => {
  let errorEmail = document.getElementById('errorEmail');
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailPattern.test(usuario.value)) {
    errorEmail.textContent = 'Insira um email válido';
    usuario.setAttribute('style', 'border-color: red');
    validUsuario = false;
  } else {
    errorEmail.textContent = '';
    usuario.setAttribute('style', 'border-color: green');
    validUsuario = true;
  }
});

senha.addEventListener('keyup', () => {
  let errorSenha = document.getElementById('errorSenha');
  if (senha.value.length < 8) {
    errorSenha.textContent = 'Insira no mínimo 8 caracteres para o campo senha';
    senha.setAttribute('style', 'border-color: red');
    validSenha = false;
  } else {
    errorSenha.textContent = '';
    senha.setAttribute('style', 'border-color: green');
    validSenha = true;
  }
});

confirmSenha.addEventListener('keyup', () => {
  let errorConfirmSenha = document.getElementById('errorConfirmSenha');
  if (senha.value !== confirmSenha.value) {
    errorConfirmSenha.textContent = 'Confirmar Senha *As senhas não conferem';
    validConfirmSenha = false;
  } else {
    errorConfirmSenha.textContent = '';
    validConfirmSenha = true;
  }
});


formCadastro.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita o envio padrão do formulário
  if(validNome && validUsuario && validSenha && validConfirmSenha){
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
    
    listaUser.push({
      nomeCad: nome.value,
      userCad: usuario.value,
      senhaCad: senha.value
    });
    
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

function TelaLogin(){
  window.document.location.href = "../login/login.html"
}

function voltarTelaInicial(){
  window.document.location.href = "../index.html"
}
