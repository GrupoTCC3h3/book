function listarLivrosDisponiveis() {
    const livrosContainer = document.getElementById('livros-disponiveis-container');
    const usuarioAtual = JSON.parse(sessionStorage.getItem("currentUser"));

    if (!livrosContainer) {
        console.error('Elemento "livros-disponiveis-container" não encontrado!');
        return;
    }

    fetch("http://localhost:3000/livros-disponiveis")
        .then(response => {
            if (!response.ok) throw new Error('Erro ao buscar livros');
            return response.json();
        })
        .then(data => {
            livrosContainer.innerHTML = ''; // Limpa o conteúdo existente

            if (data.length === 0) {
                livrosContainer.innerHTML = '<p>Não há livros disponíveis no momento.</p>';
            } else {
                const livrosDeOutrosUsuarios = data.filter(livro => livro.Pessoa && livro.Pessoa.id_usuario !== usuarioAtual.userId);

                livrosDeOutrosUsuarios.forEach(livro => {
                    const livroDiv = document.createElement('div');
                    livroDiv.classList.add('livro-card');
                    livroDiv.innerHTML = `
                        <img src="http://localhost:3000/${livro.capa}" alt="${livro.titulo}" class="livro-imagem">
                        <div class="livro-info">
                            <h3>${livro.titulo}</h3>
                            <p><strong>Autor:</strong> ${livro.autor}</p>
                            <p><strong>Gênero:</strong> ${livro.genero}</p>
                            <p><strong>Ano de Lançamento:</strong> ${livro.ano_lancamento}</p>
                            <p><strong>Estado:</strong> ${livro.estado}</p>
                            <p><strong>Dono:</strong> ${livro.Pessoa && livro.Pessoa.Usuario ? livro.Pessoa.Usuario.nome : 'Dono não informado'}</p>
                            <button class="contato-btn">Iniciar Contato</button>
                        </div>
                    `;
                    livrosContainer.appendChild(livroDiv);
                });
            }
        })
        .catch(error => {
            console.error('Erro ao carregar livros disponíveis:', error);
            livrosContainer.innerHTML = '<p>Erro ao carregar livros disponíveis.</p>';
        });
}

document.addEventListener('DOMContentLoaded', listarLivrosDisponiveis);

function voltarPaginaAnterior(){
    window.document.location.href = "../apos_login/apos_login.html"
}