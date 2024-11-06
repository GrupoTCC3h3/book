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

            const listaLivros = document.getElementById('listaLivros');
            listaLivros.innerHTML = '';  // Limpa a lista antes de exibir os livros

            // Exibir livros filtrados
            livrosDeOutrosUsuarios.forEach(livro => {
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
                listaLivros.appendChild(livroElemento);
            });
        } catch (error) {
            console.error('Erro ao carregar livros:', error);
        }
    }

    // Carregar os livros ao inicializar a página
    carregarLivros();
});
