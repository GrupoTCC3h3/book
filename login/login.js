document.addEventListener('DOMContentLoaded', () => {
    let formLogin = document.querySelector('#formLogin');
    let msgError = document.querySelector('#msgError');
    
    formLogin.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário
        
        let usuario = document.querySelector('#iemail');
        let senha = document.querySelector('#isenha');
        
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
        
        let userValid = listaUser.find(item => item.userCad === usuario.value && item.senhaCad === senha.value);
        
        if(userValid) {
            // Usuário autenticado com sucesso
            let mathRandom = Math.random().toString(16).substr(2);
            let token = mathRandom + mathRandom;
            
            localStorage.setItem('token', token);
            localStorage.setItem('userLogado', JSON.stringify(userValid));
            
            window.location.href = '../apos_login/apos_login.html'; // Redireciona para a tela inicial apos o login
        } else {
            // Exibe mensagem de erro se a autenticação falhar
            msgError.setAttribute('style', 'display: block');
            msgError.innerHTML = 'Usuário ou senha incorretos';
            usuario.focus();
        }
    });
});

function TelaCadastrar(){
    window.document.location.href = "../cadastro/cadastro.html"
}

function voltarTelaInicial(){
    window.document.location.href = "../index.html"
  }
