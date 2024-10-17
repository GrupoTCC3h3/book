document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const nome = document.getElementById('iusuario').value;
    const email = document.getElementById('iemail').value;
    const senha = document.getElementById('isenha').value;

    // Verificar se todos os campos estão preenchidos antes de enviar
    if (!nome || !email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Enviar os dados para o servidor
    fetch('http://localhost:3000/usuario', { // Certifique-se de que esta URL está correta
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }), // Converte os dados para JSON
    })
    .then(response => {
        if (response.ok) {
            alert('Usuário cadastrado com sucesso!');
            window.location.href = '../login/login.html'; // Redireciona para a página de login
        } else {
            alert('Erro ao cadastrar usuário: ' + response.statusText);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});


function voltarTelaInicial(){
    window.history.back();
}