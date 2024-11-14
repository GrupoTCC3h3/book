document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.querySelector('#formLogin');
    const msgError = document.querySelector('#msgError');
    const emailInput = document.querySelector('#iemail');
    const senhaInput = document.querySelector('#isenha');
    const lembrarMe = document.querySelector('#lembrar-me');

    // Verifica se existem dados salvos no localStorage (para "lembrar-me")
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    const isRemembered = localStorage.getItem('rememberMe');

    // Preenche os campos de email e senha se o "lembrar-me" estiver ativo
    if (isRemembered === 'true') {
        emailInput.value = savedEmail;
        senhaInput.value = savedPassword;
        lembrarMe.checked = true;
    }

    // Função de login
    formLogin.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = emailInput.value;
        const senha = senhaInput.value;

        fetch('http://localhost:3000/usuario/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        })
            .then(response => {
                if (!response.ok) {
                    // Caso a resposta da API indique erro (ex.: status 401)
                    throw new Error('Email ou senha incorretos.');
                }
                return response.json();
            })
            .then(data => {
                if (data.erro) {
                    msgError.style.display = 'block';
                    msgError.innerHTML = 'Email ou senha incorretos.';
                } else {
                    // Salva os dados do usuário no sessionStorage
                    sessionStorage.setItem('currentUser', JSON.stringify({
                        userId: data.id,  // ID do usuário
                        nome: data.nome,
                        email: data.email,
                    }));

                    // Salva dados no localStorage se "lembrar-me" estiver marcado
                    if (lembrarMe.checked) {
                        localStorage.setItem('savedEmail', email);
                        localStorage.setItem('savedPassword', senha);
                        localStorage.setItem('rememberMe', 'true');
                    } else {
                        localStorage.removeItem('savedEmail');
                        localStorage.removeItem('savedPassword');
                        localStorage.setItem('rememberMe', 'false');
                    }

                    window.location.href = '../apos_login/apos_login.html';  // Redireciona após o login
                }
            })
            .catch(error => {
                // Exibe o erro de autenticação para o usuário
                msgError.style.display = 'block';
                msgError.innerHTML = error.message;
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
