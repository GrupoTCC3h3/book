document.addEventListener("DOMContentLoaded", async function () {
    const usuarioAtual = JSON.parse(sessionStorage.getItem("currentUser"));

    if (usuarioAtual && usuarioAtual.nome) {
        document.getElementById('userName').textContent = usuarioAtual.nome;
    } else {
        document.getElementById('userName').textContent = "Usuário";
    }

    const menuButton = document.getElementById('menu');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenuButton = document.getElementById('closeMenu');
    const logoutButton = document.getElementById('logout');

    // Menu lateral
    menuButton.addEventListener('click', () => {
        sideMenu.classList.remove('hidden');
        sideMenu.classList.add('visible');
    });

    closeMenuButton.addEventListener('click', () => {
        sideMenu.classList.remove('visible');
        sideMenu.classList.add('hidden');
    });

    // Logout com confirmação
    logoutButton.addEventListener('click', (event) => {
        event.preventDefault();
        const confirmarSaida = confirm("Deseja realmente sair?");
        if (confirmarSaida) {
            sessionStorage.removeItem("currentUser");
            window.location.href = '../login/login.html';
        }
    });

    // Função para carregar os livros de outros usuários
    async function carregarLivros() {
        try {
            const response = await fetch('http://localhost:3000/livro/livro');
            if (!response.ok) throw new Error('Erro ao buscar livros');

            const livros = await response.json();
            if (!Array.isArray(livros)) throw new Error('Formato de dados inválido para os livros');

            // Filtrar livros para exibir apenas os de outros usuários
            const livrosDeOutrosUsuarios = livros.filter(livro => {
                return livro.Pessoa && livro.Pessoa.id_usuario !== usuarioAtual.userId; // Alterado para 'userId' baseado no login
            });

            return livrosDeOutrosUsuarios;
        } catch (error) {
            console.error('Erro ao carregar livros:', error);
            return [];
        }
    }

    // Função para exibir os livros ou a mensagem caso não haja livros
    function exibirLivros(livros, mensagem = '') {
        const listaLivros = document.getElementById('listaLivros');
        listaLivros.innerHTML = '';  // Limpa a lista antes de exibir os livros

        if (livros.length > 0) {
            livros.forEach(livro => {
                const livroElemento = document.createElement('div');
                livroElemento.className = 'livro-card';
                livroElemento.innerHTML = `
                    <img src="http://localhost:3000/${livro.capa}" alt="${livro.titulo}" class="livro-imagem">
                    <div class="livro-info">
                        <h3>${livro.titulo}</h3>
                        <p>Gênero: ${livro.genero}</p>
                        <p>Estado: ${livro.estado}</p>
                        <p>Dono: ${livro.Pessoa.Usuario.nome}</p>
                        <button class="contato-btn">Iniciar Contato</button>
                    </div>
                `;
                // Adicionar evento de clique no botão "Iniciar Contato"
                livroElemento.querySelector('.contato-btn').addEventListener('click', () => {
                    // Obter as informações do livro e do dono
                    const livroInfo = {
                        titulo: livro.titulo,
                        genero: livro.genero,
                        estado: livro.estado,
                        capa: livro.capa,
                        dono: livro.Pessoa.Usuario.nome, // Correção: passando nome do dono
                    };

                    // Armazenar as informações no sessionStorage
                    sessionStorage.setItem('livroEmContato', JSON.stringify(livroInfo));

                    // Redirecionar para a tela de iniciando_contato.html
                    window.location.href = '../iniciando_contato/iniciando_contato.html';
                });

                listaLivros.appendChild(livroElemento);
            });
        } else {
            const mensagemElemento = document.createElement('p');
            mensagemElemento.textContent = mensagem;
            mensagemElemento.className = 'livros-nao-encontrados'; // Classe CSS para centralizar a mensagem
            listaLivros.appendChild(mensagemElemento);
        }
    }

    // Função para filtrar os livros com base no termo de pesquisa
    async function filtrarLivros() {
        const termoPesquisa = document.getElementById('catalogo').value.toLowerCase();
        const livros = await carregarLivros();

        const livrosFiltrados = livros.filter(livro => livro.titulo.toLowerCase().includes(termoPesquisa));

        exibirLivros(livrosFiltrados, 'Nenhum livro disponível com este nome.');
    }

    // Adicionando o evento de pesquisa no input
    const inputCatalogo = document.getElementById('catalogo');
    inputCatalogo.addEventListener('input', filtrarLivros);

    // Carregar e exibir todos os livros ao inicializar a página
    const livrosIniciais = await carregarLivros();
    
    // Mensagem de "Nenhum livro cadastrado"
    if (livrosIniciais.length === 0) {
        exibirLivros(livrosIniciais, 'Nenhum livro cadastrado no momento.');
    } else {
        exibirLivros(livrosIniciais);
    }
});
