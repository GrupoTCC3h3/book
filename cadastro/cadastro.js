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
  if(nome.value.length < 2){
    labelNome.setAttribute('style', 'color: red');
    labelNome.innerHTML = 'Nome *Insira no mínimo 2 caracteres';
    nome.setAttribute('style', 'border-color: red');
    validNome = false;
  } else {
    labelNome.setAttribute('style', 'color: green');
    labelNome.innerHTML = 'Nome';
    nome.setAttribute('style', 'border-color: green');
    validNome = true;
  }
});

usuario.addEventListener('keyup', () => {
  if(usuario.value.length < 5){
    labelUsuario.setAttribute('style', 'color: red');
    labelUsuario.innerHTML = 'Email *Insira o padrão de email';
    usuario.setAttribute('style', 'border-color: red');
    validUsuario = false;
  } else {
    labelUsuario.setAttribute('style', 'color: green');
    labelUsuario.innerHTML = 'Email';
    usuario.setAttribute('style', 'border-color: green');
    validUsuario = true;
  }
});

senha.addEventListener('keyup', () => {
  if(senha.value.length < 8){
    labelSenha.setAttribute('style', 'color: red');
    labelSenha.innerHTML = 'Senha *Insira no mínimo 8 caracteres';
    senha.setAttribute('style', 'border-color: red');
    validSenha = false;
  } else {
    labelSenha.setAttribute('style', 'color: green');
    labelSenha.innerHTML = 'Senha';
    senha.setAttribute('style', 'border-color: green');
    validSenha = true;
  }
});

confirmSenha.addEventListener('keyup', () => {
  if(senha.value !== confirmSenha.value){
    labelConfirmSenha.setAttribute('style', 'color: red');
    labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem';
    confirmSenha.setAttribute('style', 'border-color: red');
    validConfirmSenha = false;
  } else {
    labelConfirmSenha.setAttribute('style', 'color: green');
    labelConfirmSenha.innerHTML = 'Confirmar Senha';
    confirmSenha.setAttribute('style', 'border-color: green');
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
