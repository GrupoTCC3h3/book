// Menu lateral
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
    const logoutButton = document.getElementById('logout'); // Referência ao botão "Sair"

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
        event.preventDefault(); // Previne que o link redirecione imediatamente
        let confirmarSaida = confirm("Deseja realmente sair?");
        if (confirmarSaida) {
            // Ação de logout, por exemplo, redirecionar para a tela de login
            window.location.href = '../login/login.html'; // Redireciona para a página de login
        }
    });
});
