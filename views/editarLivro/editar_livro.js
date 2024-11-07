document.addEventListener("DOMContentLoaded", function () {
    const livroId = window.location.pathname.split('/').pop(); // ID do livro na URL
    const formEditarLivro = document.getElementById("formEditarLivro");
    const livroNome = document.getElementById("livroNome");

    // Verifica se o formulário existe
    if (!formEditarLivro) {
        console.error("Formulário de edição não encontrado.");
        return;
    }

    // Preenche o título da página com o nome do livro
    function atualizarTitulo(nomeLivro) {
        livroNome.textContent = nomeLivro; // Altera o título da página
    }

    // Carrega os dados do livro
    fetch(`/livro/${livroId}`)
        .then(response => response.json())
        .then(livro => {
            if (livro) {
                document.getElementById("nomeLivro").value = livro.nome;
                document.getElementById("autor").value = livro.autor;
                document.getElementById("genero").value = livro.genero;
             
                atualizarTitulo(livro.nome);
            }
        })
        .catch(error => {
            console.error("Erro ao carregar os dados do livro:", error);
        });

    // Ao enviar o formulário, salva as alterações
    formEditarLivro.addEventListener("submit", function (e) {
        e.preventDefault(); // Impede o envio padrão do formulário

        const livroAlterado = {
            nome: document.getElementById("nomeLivro").value,
            autor: document.getElementById("autor").value,
            genero: document.getElementById("genero").value,
            ano: document.getElementById("ano").value
        };

        fetch(`/livro/${livroId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livroAlterado)
        })
        .then(response => response.json())
        .then(data => {
            alert("Livro atualizado com sucesso!");
            window.location.href = '/livros'; // Redireciona para a lista de livros
        })
        .catch(error => {
            console.error("Erro ao salvar alterações:", error);
            alert("Erro ao atualizar o livro.");
        });
    });
});
