document.addEventListener("DOMContentLoaded", async function () {
    const usuarioAtual = JSON.parse(sessionStorage.getItem("currentUser"));
    await carregarLivros(usuarioAtual.userId);
    document.getElementById('voltar').addEventListener('click', voltarPaginaAnterior);

    // Adiciona um único evento de clique à lista de livros para delegação de evento
    document.getElementById('listaLivros').addEventListener('click', function (event) {
        // Verifica se o clique foi no botão de apagar
        if (event.target && event.target.classList.contains('apagar-btn')) {
            const livroId = event.target.getAttribute('data-id');  // Obtém o ID do livro
            console.log("ID do livro:", livroId); // Para depuração

            if (livroId) {
                apagarLivro(livroId);  // Chama a função para apagar o livro
            } else {
                console.error("ID do livro não encontrado.");
            }
        }
    });
});

async function carregarLivros(userId) {
    try {
        const response = await fetch('http://localhost:3000/livro/livro');
        if (!response.ok) throw new Error('Erro ao buscar livros');

        const livros = await response.json();
        const meusLivros = livros.filter(livro => livro.Pessoa && livro.Pessoa.id_usuario === userId);

        const listaLivros = document.getElementById('listaLivros');
        listaLivros.innerHTML = ''; // Limpa a lista de livros antes de adicionar novos.

        meusLivros.forEach(livro => {
            const livroElemento = document.createElement('div');
            livroElemento.className = 'livro-card';
            livroElemento.dataset.livroId = livro.id; // Ajustando para o nome correto do ID (usando 'id' se for o caso)

            livroElemento.innerHTML = `
                <img src="http://localhost:3000/${livro.capa}" alt="${livro.titulo}" class="livro-imagem">
                <div class="livro-info">
                    <h3>${livro.titulo}</h3>
                    <p>Gênero: ${livro.genero}</p>
                    <p>Estado: ${livro.estado}</p>
                    <button class="opcoes-btn" onclick="toggleMenu(event)">⋮</button>
                    <div class="menu-opcoes" style="display: none;">
                        <button class="apagar-btn" data-id="${livro.id}">Apagar livro</button> 
                        <button class="editar-btn" onclick="editarLivro(${livro.id})">Editar livro</button> <!-- Botão de editar -->
                    </div>
                </div>
            `;
            listaLivros.appendChild(livroElemento);
        });
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
    }
}

async function apagarLivro(id) {
    console.log("ID do livro a ser apagado:", id);  // Verifique o ID aqui
    if (!id) {
        console.error("ID do livro não fornecido.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/livro/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("Erro ao apagar livro.");
        }

        console.log("Resposta do servidor:", response);

        console.log("Livro apagado com sucesso.");
        // Atualiza a lista após excluir o livro
        const usuarioAtual = JSON.parse(sessionStorage.getItem("currentUser"));
        await carregarLivros(usuarioAtual.userId); // Recarrega a lista de livros
    } catch (error) {
        console.error("Erro ao apagar livro:", error);
    }
}

function toggleMenu(event) {
    const menu = event.target.nextElementSibling; // Pega o menu que vem após o botão
    menu.style.display = menu.style.display === "none" || !menu.style.display ? "block" : "none";
}

// Função chamada ao clicar no botão "Editar livro"
function editarLivro(livroId) {
    window.location.href = `../editarLivro/editarLivro.html?id=${livroId}`;
}

function voltarPaginaAnterior() {
    window.location.href = '../apos_login/apos_login.html';
}
