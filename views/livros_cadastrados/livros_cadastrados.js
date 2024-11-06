let usuarioAtual; // Declara a variável global para o usuário

document.addEventListener("DOMContentLoaded", async function () { 
    usuarioAtual = JSON.parse(sessionStorage.getItem("currentUser"));

    // Carregar livros ao inicializar a página
    carregarLivros();
    document.getElementById('voltar').addEventListener('click', voltarPaginaAnterior);
});

// Função para carregar os livros do usuário logado
async function carregarLivros() {
    try {
        const response = await fetch('http://localhost:3000/livro/livro');
        if (!response.ok) throw new Error('Erro ao buscar livros');

        const livros = await response.json();
        if (!Array.isArray(livros)) throw new Error('Formato de dados inválido para os livros');

        // Filtrar livros para exibir apenas os cadastrados pelo usuário logado
        const meusLivros = livros.filter(livro => livro.Pessoa && livro.Pessoa.id_usuario === usuarioAtual.userId);

        const listaLivros = document.getElementById('listaLivros');
        listaLivros.innerHTML = '';  // Limpa a lista antes de exibir os livros

        // Exibir livros filtrados
        meusLivros.forEach(livro => {
            const livroElemento = document.createElement('div');
            livroElemento.className = 'livro-card';
            livroElemento.dataset.livroId = livro.id; // Adiciona o id como um atributo de dados para fácil referência
            livroElemento.innerHTML = `
                <img src="http://localhost:3000/${livro.capa}" alt="${livro.titulo}" class="livro-imagem">
                <div class="livro-info">
                    <h3>${livro.titulo}</h3>
                    <p>Gênero: ${livro.genero}</p>
                    <p>Estado: ${livro.estado}</p>
                    <button class="opcoes-btn" onclick="toggleMenu(event)">⋮</button>
                    <div class="menu-opcoes" style="display: none;">
                        <button onclick="editarLivro(${livro.id})">Editar informações</button>
                        <button onclick="apagarLivro(${livro.id})">Apagar livro</button>
                    </div>
                </div>
            `;
            listaLivros.appendChild(livroElemento);
        });
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
    }
}

// Função para alternar a visibilidade do menu de opções
function toggleMenu(event) {
    const menu = event.target.nextElementSibling; // O próximo elemento que é o menu
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block'; // Alterna entre exibir e esconder
}

// Função para editar as informações do livro
function editarLivro(livroId) {
    alert(`Editar livro com ID: ${livroId}`);
    // Exemplo de redirecionamento para uma página de edição
    // window.location.href = `editar_livro.html?id=${livroId}`;
}

// Função para apagar um livro
async function apagarLivro(livroId) {
    const confirmacao = confirm('Tem certeza que deseja apagar este livro?');
    if (confirmacao) {
        try {
            const response = await fetch(`http://localhost:3000/livro/${livroId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Erro ao apagar o livro');
            
            // Buscar o elemento do livro no DOM e removê-lo
            const livroElemento = document.querySelector(`.livro-card[data-livro-id="${livroId}"]`);
            if (livroElemento) {
                livroElemento.remove(); // Remove o livro da lista na interface
            }

            alert('Livro apagado com sucesso!');
        } catch (error) {
            console.error('Erro ao apagar livro:', error);
        }
    }
}

// Função para apagar um livro
async function apagarLivro(livroId) {
    const confirmacao = confirm('Tem certeza que deseja apagar este livro?');
    if (confirmacao) {
        try {
            const response = await fetch(`http://localhost:3000/livro/${livroId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Erro ao apagar o livro');

            // Remover o livro do DOM
            const livroElemento = document.querySelector(`.livro-card[data-livro-id="${livroId}"]`);
            if (livroElemento) {
                livroElemento.remove(); // Remove o livro da lista na interface
            }

            alert('Livro apagado com sucesso!');
        } catch (error) {
            console.error('Erro ao apagar livro:', error);
        }
    }
}

function voltarPaginaAnterior() {
    window.location.href = '../apos_login/apos_login.html';
}
