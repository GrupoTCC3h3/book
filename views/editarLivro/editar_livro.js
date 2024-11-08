document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const livroId = params.get("id");
    const livroTitulo = params.get("titulo");
    const formEditarLivro = document.getElementById("formEditarLivro");
    const livroNomeElement = document.getElementById("livroNome");
    const botaoSalvar = document.getElementById("salvarAlteracoes");  // Aqui pegamos o botão

    if (!formEditarLivro) {
        console.error("Formulário de edição não encontrado.");
        return;
    }

    // Exibe o título do livro na página, se fornecido na URL
    if (livroTitulo) {
        livroNomeElement.textContent = livroTitulo;
    }

    // Verifica se o id do livro foi fornecido na URL
    if (!livroId) {
        alert("ID do livro não fornecido.");
        return;
    }

    // Carregar os dados do livro ao abrir a página
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

    // Função para validar o ano
    function validarAno(ano) {
        const anoRegex = /^\d{4}$/;
        return anoRegex.test(ano);
    }

    // Função para verificar alterações
    function verificarAlteracoes() {
        const nomeLivro = document.getElementById("nomeLivro").value;
        const autor = document.getElementById("autor").value;
        const genero = document.getElementById("genero").value;
        const ano = document.getElementById("ano").value;

        // Verifica se houve alteração
        if (nomeLivro !== '' || autor !== '' || genero !== '' || ano !== '') {
            botaoSalvar.disabled = false;  // Habilita o botão salvar
        } else {
            botaoSalvar.disabled = true;   // Desabilita o botão salvar
        }
    }

    // Adiciona evento de input nos campos para monitorar alterações
    document.getElementById("nomeLivro").addEventListener('input', verificarAlteracoes);
    document.getElementById("autor").addEventListener('input', verificarAlteracoes);
    document.getElementById("genero").addEventListener('input', verificarAlteracoes);
    document.getElementById("ano").addEventListener('input', verificarAlteracoes);

    // Submissão do formulário de edição
    formEditarLivro.addEventListener("submit", function (e) {
        e.preventDefault();

        const nomeLivro = document.getElementById("nomeLivro").value;
        const autor = document.getElementById("autor").value;
        const genero = document.getElementById("genero").value;
        const ano = document.getElementById("ano").value;

        // Validação do campo Ano
        if (!validarAno(ano)) {
            alert("O campo Ano deve conter exatamente 4 dígitos numéricos.");
            return;
        }

        const livroAlterado = {};
        if (nomeLivro !== '') livroAlterado.titulo = nomeLivro;
        if (autor !== '') livroAlterado.autor = autor;
        if (genero !== '') livroAlterado.genero = genero;
        if (ano !== '') livroAlterado.ano_lancamento = ano;

        // Verifica se houve alguma alteração
        if (Object.keys(livroAlterado).length === 0) {
            alert("Nenhuma alteração foi feita.");
            return;
        }

        console.log("Dados para atualização:", livroAlterado);

        // Enviar a solicitação de atualização
        fetch(`http://localhost:3000/livro/${livroId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livroAlterado)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Livro atualizado com sucesso!") {
                    alert("Livro atualizado com sucesso!");
                    window.location.href = '../livros_cadastrados/livros_cadastrado.html';
                } else {
                    alert("Erro ao atualizar o livro: " + data.message);
                }
            })
            .catch(error => {
                console.error("Erro ao salvar alterações:", error);
                alert("Erro ao atualizar o livro.");
            });
    });

    // Inicialmente, desabilita o botão salvar
    botaoSalvar.disabled = true;
});


function voltar() {
    window.document.location.href = "../livros_cadastrados/livros_cadastrado.html"
}