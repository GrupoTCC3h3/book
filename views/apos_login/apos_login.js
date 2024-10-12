document.addEventListener("DOMContentLoaded", function () {
    let listaUser = JSON.parse(localStorage.getItem('listaUser'));

    if (listaUser && listaUser.length > 0) {
        let ultimoUsuario = listaUser[listaUser.length - 1];
        let nomeUsuario = ultimoUsuario.nomeCad;

        document.getElementById('userName').textContent = nomeUsuario;
    } else {
        document.getElementById('userName').textContent = "Usuário";
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
