document.addEventListener("DOMContentLoaded", async function () {
    const usuarioAtual = JSON.parse(sessionStorage.getItem("currentUser"));
    await carregarLivros(usuarioAtual.userId);
    document.getElementById('voltar').addEventListener('click', voltarPaginaAnterior);

    document.getElementById('listaLivros').addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('apagar-btn')) {
            const livroId = event.target.getAttribute('data-id');
            if (livroId) {
                apagarLivro(livroId, usuarioAtual); // Passando o usuário atual como argumento
            } else {
                console.error("ID do livro não encontrado.");
            }
        }
    });

    // Escuta por mensagens de outras janelas (como a página de editarLivro)
    window.addEventListener('message', (event) => {
        if (event.data.action === 'reloadLivros') {
            carregarLivros(usuarioAtual.userId);
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
        listaLivros.innerHTML = '';

        meusLivros.forEach(livro => {
            const livroElemento = document.createElement('div');
            livroElemento.className = 'livro-card';
            livroElemento.dataset.livroId = livro.id;

            livroElemento.innerHTML = `
                <img src="http://localhost:3000/${livro.capa}" alt="${livro.titulo}" class="livro-imagem">
                <div class="livro-info">
                    <h3>${livro.titulo}</h3>
                    <p>Gênero: ${livro.genero}</p>
                    <p>Estado: ${livro.estado}</p>
                    <button class="opcoes-btn" onclick="toggleMenu(event)">⋮</button>
                    <div class="menu-opcoes" style="display: none;">
                        <button class="apagar-btn" data-id="${livro.id}">Apagar livro</button> 
                        <button class="editar-btn" onclick="editarLivro(${livro.id}, '${livro.titulo}')">Editar livro</button>
                    </div>
                </div>
            `;
            listaLivros.appendChild(livroElemento);
        });
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
    }
}

async function apagarLivro(id, usuarioAtual) {
    if (!id) {
        console.error("ID do livro não fornecido.");
        return;
    }

    // Pergunta ao usuário se ele tem certeza de que deseja excluir o livro
    const confirmacao = confirm("Você tem certeza de que deseja apagar este livro?");

    if (!confirmacao) {
        console.log("Exclusão do livro cancelada.");
        return; // Se o usuário cancelar, a função termina aqui
    }

    try {
        // Fazer a requisição para excluir as mensagens e contatos associados ao livro
        const response = await fetch(`http://localhost:3000/livro/deletarContatoEMensagem/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            console.error("Erro ao deletar contato ou mensagens.");
            return;
        }

        // Excluir o livro
        const livroDeletado = await fetch(`http://localhost:3000/livro/deletar/${id}`, {
            method: 'DELETE',
        });

        if (!livroDeletado.ok) {
            console.error("Livro não encontrado.");
            return;
        }

        console.log("Livro deletado com sucesso.");
        // Atualize a lista de livros após a exclusão
        carregarLivros(usuarioAtual.userId);
    } catch (error) {
        console.error('Erro ao deletar livro ou mensagens:', error);
    }
}










function toggleMenu(event) {
    const menu = event.target.nextElementSibling;
    menu.style.display = menu.style.display === "none" || !menu.style.display ? "block" : "none";
}

function editarLivro(livroId, livroTitulo) {
    window.location.href = `../editarLivro/editarLivro.html?id=${livroId}&titulo=${encodeURIComponent(livroTitulo)}`;
}

 // Função para voltar à página anterior
 function voltarPaginaAnterior() {
    window.document.location.href =  "../apos_login/apos_login.html"
}
