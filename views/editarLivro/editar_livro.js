document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const livroId = params.get("id");
    const livroTitulo = params.get("titulo");
    const formEditarLivro = document.getElementById("formEditarLivro");
    const livroNomeElement = document.getElementById("livroNome");

    if (!formEditarLivro) {
        console.error("Formulário de edição não encontrado.");
        return;
    }

    if (livroTitulo) {
        livroNomeElement.textContent = livroTitulo;
    }

    if (!livroId) {
        alert("ID do livro não fornecido.");
        return;
    }

    fetch(`http://localhost:3000/livro/${livroId}`)
        .then(response => {
            if (!response.ok) {
                console.error("Erro ao carregar os dados do livro. Status:", response.status);
                throw new Error('Erro ao carregar os dados do livro');
            }
            return response.json();
        })
        .then(livro => {
            if (livro) {
                document.getElementById("nomeLivro").value = livro.titulo;
                document.getElementById("autor").value = livro.autor;
                document.getElementById("genero").value = livro.genero;
                document.getElementById("ano").value = livro.ano_lancamento;
            }
        })
        .catch(error => {
            console.error("Erro ao carregar os dados do livro:", error);
            alert("Erro ao carregar os dados do livro.");
        });

    function validarAno(ano) {
        const anoRegex = /^\d{4}$/;
        return anoRegex.test(ano);
    }

    formEditarLivro.addEventListener("submit", function (e) {
        e.preventDefault();

        const nomeLivro = document.getElementById("nomeLivro").value;
        const autor = document.getElementById("autor").value;
        const genero = document.getElementById("genero").value;
        const ano = document.getElementById("ano").value;

        if (!validarAno(ano)) {
            alert("O campo Ano deve conter exatamente 4 dígitos numéricos.");
            return;
        }

        const livroAlterado = {};
        if (nomeLivro !== '') livroAlterado.titulo = nomeLivro;
        if (autor !== '') livroAlterado.autor = autor;
        if (genero !== '') livroAlterado.genero = genero;
        if (ano !== '') livroAlterado.ano_lancamento = ano;

        if (Object.keys(livroAlterado).length === 0) {
            alert("Nenhuma alteração foi feita.");
            return;
        }

        console.log("Dados para atualização:", livroAlterado);

        fetch(`http://localhost:3000/livro/${livroId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livroAlterado)
        })
        .then(response => {
            if (!response.ok) {
                console.error("Erro ao atualizar o livro. Status:", response.status);
                return response.text(); 
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                console.log("Resposta do servidor:", data);
                if (data.message) {
                    alert("Livro atualizado com sucesso!");
                    window.opener.postMessage({ action: 'reloadLivros' }, '*');
                    window.location.href = '../livros_cadastrados/livros_cadastrado.html';
                } else {
                    alert("Erro ao atualizar o livro: " + data.message);
                }
            }
        })
        .catch(error => {
            console.error("Erro ao salvar alterações:", error);
            alert("Erro ao atualizar o livro.");
        });
    });
});
