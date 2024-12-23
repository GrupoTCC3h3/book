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
            const usuario = getUsuarioLogado();
            const baseUrl = await getAPIURL();
            const response = await fetch(`${baseUrl}/livro/otherUsers?id_pessoa=${usuario.userId}`);
            if (!response.ok) throw new Error('Erro ao buscar livros');

            const livros = await response.json();
            if (!Array.isArray(livros)) throw new Error('Formato de dados inválido para os livros');

            saveOtherUserBooks(livros);

            return livros;
        } catch (error) {
            console.error('Erro ao carregar livros:', error);
            return [];
        }
    }

    async function carregaContatoIniciado(idLivro) {
        try {
            const usuario = getUsuarioLogado();
            const baseUrl = await getAPIURL();
            const response = await fetch(`${baseUrl}/contato/iniciado?idLivro=${idLivro}&idIniciador=${usuario.userId}`);
            if (!response.ok) throw new Error('Erro ao buscar livros');

            const contatos = await response.json();

            if (contatos.length > 0) {
                return contatos[0];
            }

            return null;
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
            livros.forEach(async livro => {
                const contatoIniciado = await carregaContatoIniciado(livro.id);
                const textoBotao = contatoIniciado ? "Entrar na Conversa" : "Iniciar Contato"

                const livroElemento = document.createElement('div');
                livroElemento.className = 'livro-card';
                livroElemento.innerHTML = `
                    <img src="http://localhost:3000/${livro.capa}" alt="${livro.titulo}" class="livro-imagem">
                    <div class="livro-info">
                        <h3>${livro.titulo}</h3>
                        <p>Gênero: ${livro.genero}</p>
                        <p>Estado: ${livro.estado}</p>
                        <p>Dono: ${livro.Pessoa.Usuario.nome}</p>
                        <button class="contato-btn">${textoBotao}</button>
                    </div>
                `;
                livroElemento.querySelector('.contato-btn').addEventListener('click', () => {
                    if (contatoIniciado) {
                        const nomeDono = encodeURIComponent(livro.Pessoa.Usuario.nome);
                        window.location.href = `../mensagens/mensagens.html?idContato=${contatoIniciado.id}&nomeDono=${nomeDono}`;
                        return;
                    }
                
                    // Armazenar a troca no localStorage, associando ao userId
                    const usuario = getUsuarioLogado(); // Obtém o usuário logado
                    const novaTroca = {
                        idLivro: livro.id,
                        titulo: livro.titulo,
                        genero: livro.genero,
                        estado: livro.estado,
                        dono: livro.Pessoa.Usuario.nome,
                        capa: livro.capa,
                    };
                
                    // Carregar as trocas do usuário logado ou criar uma nova lista
                    let trocasAtivas = JSON.parse(localStorage.getItem(`trocasAtivas_${usuario.userId}`)) || [];
                    trocasAtivas.push(novaTroca);
                
                    // Salvar as trocas no localStorage para o usuário atual
                    localStorage.setItem(`trocasAtivas_${usuario.userId}`, JSON.stringify(trocasAtivas));
                
                    // Redirecionar para a tela de iniciando_contato.html
                    window.location.href = `../iniciando_contato/iniciando_contato.html?idLivro=${livro.id}`;
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
        exibirLivros(livrosIniciais, 'Livros indisponiveis no momento.');
    } else {
        exibirLivros(livrosIniciais);
    }
});
