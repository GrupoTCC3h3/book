document.addEventListener("DOMContentLoaded", function () { 
    let listaUser = JSON.parse(localStorage.getItem('listaUser'));

    if (listaUser && listaUser.length > 0) {
        let ultimoUsuario = listaUser[listaUser.length - 1];
        let nomeUsuario = ultimoUsuario.nomeCad;

        document.getElementById('userName').textContent = nomeUsuario;
    } else {
        document.getElementById('userName').textContent = "Usuário";
    }

    const menuButton = document.getElementById('menu');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenuButton = document.getElementById('closeMenu');

    // Abrir o menu
    menuButton.addEventListener('click', function () {
        sideMenu.classList.remove('hidden');
        sideMenu.classList.add('visible');
    });

    // Fechar o menu
    closeMenuButton.addEventListener('click', function () {
        sideMenu.classList.remove('visible');
        sideMenu.classList.add('hidden');
    });
});

document.getElementById('voltar').addEventListener('click', function() {
    // Redirecionar para a página inicial pós-login
    window.location.href = '../apos_login/apos_login.html'; // Substitua pelo caminho correto da página inicial
});

// Confirmar saída
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', function (event) {
    event.preventDefault();
    let confirmarSaida = confirm("Deseja realmente sair?");
    if (confirmarSaida) {
        window.location.href = '../login/login.html'; // Redireciona para a página de login
    }
});

// Função para capturar os dados do formulário de cadastro e enviar para o backend
document.getElementById('form_cadastrar_livros').addEventListener('submit', function(event) {
    event.preventDefault();  // Previne o envio padrão do formulário

    // Captura os dados dos campos do formulário
    const livro = {
        nome: document.getElementById('nome_livro').value,
        genero: document.getElementById('genero_livro').value,
        condicoes: document.getElementById('cond_livro').value,
        autor: document.getElementById('nome_autor').value,
        ano: document.getElementById('ano_livro').value
    };

    // Envia os dados para o servidor usando fetch API
    fetch('/cadastrar-livro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(livro)
    })
    .then(response => response.json())
    .then(data => {
        alert('Livro cadastrado com sucesso!');
        // Limpa o formulário
        document.getElementById('form_cadastrar_livros').reset();
    })
    .catch(error => {
        console.error('Erro ao cadastrar livro:', error);
        alert('Erro ao cadastrar livro. Tente novamente.');
    });
});
