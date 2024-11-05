document.addEventListener("DOMContentLoaded", async function () {
    const usuarioAtual = JSON.parse(sessionStorage.getItem("currentUser"));

    if (usuarioAtual) {
        document.getElementById('userName').textContent = usuarioAtual.nome;
    } else {
        document.getElementById('userName').textContent = "Usuário";
    }

    const menuButton = document.getElementById('menu');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenuButton = document.getElementById('closeMenu');
    const logoutButton = document.getElementById('logout');

    menuButton.addEventListener('click', function () {
        sideMenu.classList.remove('hidden');
        sideMenu.classList.add('visible');
    });

    closeMenuButton.addEventListener('click', function () {
        sideMenu.classList.remove('visible');
        sideMenu.classList.add('hidden');
    });

    logoutButton.addEventListener('click', function (event) {
        event.preventDefault();
        let confirmarSaida = confirm("Deseja realmente sair?");
        if (confirmarSaida) {
            sessionStorage.removeItem("currentUser");
            window.location.href = '../login/login.html';
        }
    });

    async function carregarLivros() {
        try {
            const response = await fetch('http://localhost:3000/livro/livro'); // Rota completa com localhost e porta
            if (!response.ok) throw new Error('Erro ao buscar livros');
            const livros = await response.json();

            const listaLivros = document.getElementById('listaLivros');
            listaLivros.innerHTML = '';

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
                listaLivros.appendChild(livroElemento);
            });           
        } catch (error) {
            console.error('Erro ao carregar livros:', error);
        }
    }

    carregarLivros();
});
