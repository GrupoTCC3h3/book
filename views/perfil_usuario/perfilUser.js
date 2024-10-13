// Abrir e fechar o menu lateral
const menuButton = document.getElementById('menu');
const sideMenu = document.getElementById('sideMenu');
const closeMenuButton = document.getElementById('closeMenu');

menuButton.addEventListener('click', () => {
    sideMenu.classList.add('visible');
});

closeMenuButton.addEventListener('click', () => {
    sideMenu.classList.remove('visible');
});

// Carregar informações do usuário logado do localStorage
const nomeUsuario = document.getElementById('nomeUsuario');
const emailUsuario = document.getElementById('emailUsuario');
const dataNascimento = document.getElementById('dataNascimento');
const endereco = document.getElementById('endereco');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');

// Função para preencher o perfil automaticamente ao carregar a página
window.onload = function () {
    const usuarioAtual = JSON.parse(sessionStorage.getItem('currentUser'));

    if (usuarioAtual) {
        nomeUsuario.textContent = usuarioAtual.nomeCad || 'Nome não disponível';
        emailUsuario.textContent = usuarioAtual.userCad || 'Email não disponível';
        dataNascimento.textContent = usuarioAtual.dataNascimento || '';
        endereco.textContent = usuarioAtual.endereco?.logradouro || '';
        bairro.textContent = usuarioAtual.endereco?.bairro || '';
        cidade.textContent = usuarioAtual.endereco?.cidade || '';
    } else {
        nomeUsuario.textContent = 'Nome não disponível';
        emailUsuario.textContent = 'Email não disponível';
    }
};

// Logout
document.getElementById('logout').addEventListener('click', function () {
    localStorage.removeItem('usuarioAtual'); // Limpa apenas o usuário atual
    window.location.href = '../index.html'; // Redireciona para a página inicial
});

// Função para voltar à página anterior
function voltarPaginaAnterior() {
    window.document.location.href = "../apos_login/apos_login.html";
}

// Função para redirecionar para a página de edição de perfil
function editarPerfil() {
    window.location.href = 'editarPerfil/editarPerfil.html'; // Redireciona para a página de edição de perfil
}

function voltarInicio(){
    window.document.location.href = '../apos_login/apos_login.html'
}
