document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.querySelector('#formLogin');
    const msgError = document.querySelector('#msgError');
    const emailInput = document.querySelector('#iemail');
    const senhaInput = document.querySelector('#isenha');
    const lembrarMe = document.querySelector('#lembrar-me');

    // Verifica se existem dados salvos no localStorage
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    const isRemembered = localStorage.getItem('rememberMe');

    if (isRemembered === 'true') {
        emailInput.value = savedEmail;
        senhaInput.value = savedPassword;
        lembrarMe.checked = true;
    }

    formLogin.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário

        const email = emailInput.value;
        const senha = senhaInput.value;

        fetch('http://localhost:3000/usuario/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }), // Envia o email e a senha
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.message || 'Erro desconhecido'); // Lança erro com a mensagem do servidor
                    });
                }
                return response.json();
            })
            .then(data => {
                // Armazena os dados do usuário na sessionStorage
                sessionStorage.setItem('currentUser', JSON.stringify({
                    nome: data.nome,
                    email: data.email,
                }));

                // Verifica se a opção de lembrar-me está marcada
                if (lembrarMe.checked) {
                    localStorage.setItem('savedEmail', email);
                    localStorage.setItem('savedPassword', senha);
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    localStorage.removeItem('savedEmail');
                    localStorage.removeItem('savedPassword');
                    localStorage.removeItem('rememberMe');
                }

                window.location.href = '../apos_login/apos_login.html'; // Redireciona após o login
            })
            .catch(error => {
                msgError.setAttribute('style', 'display: block');
                msgError.innerHTML = 'Erro: ' + error.message; // Exibe a mensagem de erro
                console.error('Erro ao fazer login:', error);
            });
    });
});

// Função para redirecionar para a tela de cadastro
function TelaCadastrar() {
    window.location.href = "../cadastro/cadastro.html";
}

// Função para voltar à tela inicial
function voltarTelaInicial() {
    window.location.href = '../index.html';
}
