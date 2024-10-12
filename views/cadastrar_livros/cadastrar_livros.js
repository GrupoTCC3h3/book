const menuButton = document.getElementById('menu');
const sideMenu = document.getElementById('sideMenu');
const closeMenuButton = document.getElementById('closeMenu');
const logoutButton = document.getElementById('logout');

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

// Confirmar saída
logoutButton.addEventListener('click', function (event) {
    event.preventDefault();
    let confirmarSaida = confirm("Deseja realmente sair?");
    if (confirmarSaida) {
        window.location.href = '../login/login.html';
    }
});


// Função para exibir o nome do último usuário cadastrado (ajuste com base na sua lógica de login)
function exibirNomeUsuario() {
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    document.getElementById('nome_usuario').textContent = nomeUsuario ? nomeUsuario : '[Nome usuario]';
}

// Chama a função ao carregar a página
window.onload = exibirNomeUsuario;

document.getElementById('form_cadastrar_livros').addEventListener('submit', async function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Obtém os valores dos campos
    const nomeLivro = document.getElementById('nome_livro').value;
    const generoLivro = document.getElementById('genero_livro').value;
    const condicaoLivro = document.getElementById('cond_livro').value;
    const nomeAutor = document.getElementById('nome_autor').value;
    const anoLivro = document.getElementById('ano_livro').value;

    // Monta o objeto com os dados do livro
    const livro = {
        titulo: nomeLivro,
        estado: condicaoLivro, // Usaremos o campo "cond_livro" para o estado
        ano_lancamento: anoLivro,
        autor: nomeAutor,
        id_dono: 1 // Ajustar para o ID do usuário logado (colocar a lógica correta no futuro)
    };

    try {
        // Faz a requisição para o back-end
        const response = await fetch('http://localhost:3000/livro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livro) // Envia o objeto livro como JSON
        });

        if (response.ok) {
            const novoLivro = await response.json();
            console.log('Livro cadastrado:', novoLivro); // Adicione isto
            alert("Livro cadastrado com sucesso!");
            document.getElementById('form_cadastrar_livros').reset();
        } else {
            const errorResponse = await response.json(); // Obtenha a resposta de erro do servidor
            console.error('Erro ao cadastrar livro:', errorResponse); // Exibe o erro no console
            alert("Erro ao cadastrar o livro: " + errorResponse.message);
        }
    } catch (error) {
        alert("Erro ao se conectar ao servidor.");
        console.error(error);
    }
});
