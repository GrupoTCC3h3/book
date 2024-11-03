document.addEventListener("DOMContentLoaded", async function () {
    // Obtenha o usuário logado da sessionStorage
    const usuarioAtual = JSON.parse(sessionStorage.getItem("currentUser"));

    // Verifica se existe um usuário logado e define o nome
    if (usuarioAtual) {
        document.getElementById('userName').textContent = usuarioAtual.nome; // Exibe o nome do usuário
    } else {
        document.getElementById('userName').textContent = "Usuário"; // Valor padrão
    }

    const menuButton = document.getElementById('menu');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenuButton = document.getElementById('closeMenu');
    const logoutButton = document.getElementById('logout');

    // Abrir o menu
    menuButton.addEventListener('click', function () {
        sideMenu.classList.remove('hidden');
        sideMenu.classList.add('visible');
    });

    // Fechar o menu
    closeMenuButton.addEventListener('click', function () {
        sideMenu.classList.remove('visible');
        sideMenu.classList.add('hidden');
    });

    // Confirmar saída
    logoutButton.addEventListener('click', function (event) {
        event.preventDefault();
        let confirmarSaida = confirm("Deseja realmente sair?");
        if (confirmarSaida) {
            sessionStorage.removeItem("currentUser"); // Remove o usuário da sessão
            window.location.href = '../login/login.html';
        }
    });

    // Função para carregar os livros via API
    async function carregarLivros() {
        try {
            const response = await fetch('./livroRoutes'); // Rota para buscar os livros
            if (!response.ok) throw new Error('Erro ao buscar livros');
            const livros = await response.json();

            const listaLivros = document.getElementById('listaLivros');
            listaLivros.innerHTML = ''; // Limpa a lista existente

            livros.forEach(livro => {
                const livroElemento = document.createElement('div');
                livroElemento.className = 'livro-card'; // Classe para estilização
                livroElemento.innerHTML = `
                    <img src="${livro.capa}" alt="${livro.titulo}" class="livro-imagem">
                    <h3>${livro.titulo}</h3>
                    <p>Gênero: ${livro.genero}</p>
                    <p>Estado: ${livro.estado}</p>
                    <p>Dono: ${livro.Pessoa.nome}</p>
                `;
                listaLivros.appendChild(livroElemento);
            });
        } catch (error) {
            console.error('Erro ao carregar livros:', error);
        }
    }

    // Carregar livros ao inicializar
    carregarLivros();
});
