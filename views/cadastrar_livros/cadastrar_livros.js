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
        estado: condicaoLivro,
        ano_lancamento: anoLivro,
        autor: nomeAutor,
        id_dono: idDono
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
            console.log('Livro cadastrado:', novoLivro); // Log para depuração
            alert("Livro cadastrado com sucesso!");

            // Limpa os campos do formulário
            document.getElementById('form_cadastrar_livros').reset();
        } else {
            const errorText = await response.text(); // Captura a resposta como texto
            console.error('Erro ao cadastrar livro:', errorText);
            alert("Erro ao cadastrar o livro. Verifique os dados e tente novamente.");
        }
        
    } catch (error) {
        alert("Erro ao se conectar ao servidor.");
        console.error(error);
    }
});