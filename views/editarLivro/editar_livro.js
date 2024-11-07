document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const livroId = urlParams.get('id'); // Obtém o ID do livro da URL

    if (!livroId) {
        alert("ID do livro não fornecido.");
        window.location.href = 'livros.html'; // Redireciona caso o ID não esteja presente
    }

    carregarDadosLivro(livroId);

    // Evento de submit do formulário
    document.getElementById("formEditarLivro").addEventListener("submit", function (e) {
        e.preventDefault(); // Impede o comportamento padrão de enviar o formulário
        salvarAlteracoes(livroId);
    });
});

async function carregarDadosLivro(livroId) {
    try {
        const response = await fetch(`http://localhost:3000/livro/${livroId}`);
        const livro = await response.json();

        if (!livro) {
            alert("Livro não encontrado.");
            window.location.href = 'livros.html'; // Redireciona caso o livro não seja encontrado
        }

        // Preenche o formulário com os dados do livro
        document.getElementById("titulo").value = livro.titulo;
        document.getElementById("genero").value = livro.genero;
        document.getElementById("estado").value = livro.estado;
        document.getElementById("capa").value = livro.capa;

    } catch (error) {
        console.error("Erro ao carregar os dados do livro:", error);
    }
}

async function salvarAlteracoes(livroId) {
    const titulo = document.getElementById("titulo").value;
    const genero = document.getElementById("genero").value;
    const estado = document.getElementById("estado").value;
    const capa = document.getElementById("capa").value;

    const livroAtualizado = { titulo, genero, estado, capa };

    try {
        const response = await fetch(`http://localhost:3000/livro/${livroId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(livroAtualizado),
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar o livro');
        }

        alert("Livro atualizado com sucesso!");
        window.location.href = 'livros.html'; // Redireciona de volta para a tela de livros
    } catch (error) {
        console.error("Erro ao atualizar livro:", error);
    }
}

function voltarPagina() {
    window.location.href = 'livros.html';
}
