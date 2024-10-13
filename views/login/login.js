document.addEventListener('DOMContentLoaded', () => {
    let formLogin = document.querySelector('#formLogin');
    let msgError = document.querySelector('#msgError');
    let emailInput = document.querySelector('#iemail');
    let senhaInput = document.querySelector('#isenha');
    let lembrarMe = document.querySelector('#lembrar-me');

    // Verifica se existem dados salvos no localStorage
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    const isRemembered = localStorage.getItem('rememberMe');

    // Se existir email e senha salvos, preenche os campos automaticamente
    if (isRemembered === 'true') {
        emailInput.value = savedEmail;
        senhaInput.value = savedPassword;
        lembrarMe.checked = true; // Mantém a caixa de lembrar-me marcada
    }

    formLogin.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário
        
        let usuario = emailInput.value;
        let senha = senhaInput.value;
        
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
        
        let userValid = listaUser.find(item => item.userCad === usuario && item.senhaCad === senha);
        
        if (userValid) {
            sessionStorage.setItem("currentUser", JSON.stringify(userValid));

            // Usuário autenticado com sucesso
            let mathRandom = Math.random().toString(16).substr(2);
            let token = mathRandom + mathRandom;
            
            localStorage.setItem('token', token);
            localStorage.setItem('userLogado', JSON.stringify(userValid));
            
            // Salva o nome e email no localStorage após o login
            salvarUsuarioNoLocalStorage(userValid.nomeCad, userValid.userCad);

            // Verifica se a opção de lembrar-me está marcada
            if (lembrarMe.checked) {
                localStorage.setItem('savedEmail', usuario);
                localStorage.setItem('savedPassword', senha);
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('savedEmail');
                localStorage.removeItem('savedPassword');
                localStorage.removeItem('rememberMe');
            }

            window.location.href = '../apos_login/apos_login.html'; // Redireciona para a tela inicial apos o login
        } else {
            // Exibe mensagem de erro se a autenticação falhar
            msgError.setAttribute('style', 'display: block');
            msgError.innerHTML = 'Usuário ou senha incorretos';
            emailInput.focus();
        }
    });
});

// Função para salvar nome e email no localStorage
function salvarUsuarioNoLocalStorage(nome, email) {
    localStorage.setItem('nomeUsuario', nome);
    localStorage.setItem('emailUsuario', email);
}

function TelaCadastrar(){
    window.document.location.href = "../cadastro/cadastro.html";
}

function voltarTelaInicial(){
    window.document.location.href = '../index.html'
}

