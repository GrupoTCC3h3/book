document.addEventListener("DOMContentLoaded", function () {
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

    // Carregar livros e exibi-los
    const livros = JSON.parse(localStorage.getItem('livros')) || [];
    const listaLivros = document.getElementById('listaLivros');
    listaLivros.innerHTML = ''; // Limpa a lista existente
    livros.forEach(livro => {
        const livroElemento = document.createElement('div');
        livroElemento.className = 'livro-card'; // Classe para estilização
        livroElemento.innerHTML = `
            <img src="${livro.imagem}" alt="${livro.nome}" class="livro-imagem">
            <h3>${livro.nome}</h3>
            <p>${livro.autor}</p>
        `;
        listaLivros.appendChild(livroElemento);
    });
});
