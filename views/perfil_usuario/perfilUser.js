// Abrir e fechar o menu lateral
const menuButton = document.getElementById('menu');
const sideMenu = document.getElementById('sideMenu');
const closeMenuButton = document.getElementById('closeMenu');
const userName = document.getElementById('userName');

menuButton.addEventListener('click', () => {
    sideMenu.classList.add('visible');
});

closeMenuButton.addEventListener('click', () => {
    sideMenu.classList.remove('visible');
});

// Exibir o nome do último usuário cadastrado no menu
const ultimoUsuarioCadastrado = localStorage.getItem('ultimoUsuario');
if (ultimoUsuarioCadastrado) {
    userName.textContent = ultimoUsuarioCadastrado;
}

// Carregar informações do usuário do localStorage
const nomeUsuario = document.getElementById('nomeUsuario');
const emailUsuario = document.getElementById('emailUsuario');
const dataNascimento = document.getElementById('dataNascimento');
const endereco = document.getElementById('endereco');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');

// Função para preencher o perfil automaticamente ao carregar a página
window.onload = function() {
    const nome = localStorage.getItem('nomeUsuario');
    const email = localStorage.getItem('emailUsuario');

    // Exibir informações
    nomeUsuario.textContent = nome ? nome : 'Nome não disponível';
    emailUsuario.textContent = email ? email : 'Email não disponível';

    // Verificar se as informações de perfil estão disponíveis e limpar campos se não
    dataNascimento.textContent = localStorage.getItem('dataNascimento') || ''; 
    endereco.textContent = localStorage.getItem('endereco') || ''; 
    bairro.textContent = localStorage.getItem('bairro') || ''; 
    cidade.textContent = localStorage.getItem('cidade') || ''; 
};

// Logout
document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('ultimoUsuario');
    localStorage.removeItem('nomeUsuario');
    localStorage.removeItem('emailUsuario');
    localStorage.removeItem('dataNascimento');
    localStorage.removeItem('endereco');
    localStorage.removeItem('bairro');
    localStorage.removeItem('cidade');
    window.location.href = '../index.html';
});

// Função para voltar à página anterior
function voltarPaginaAnterior() {
    window.document.location.href = "../apos_login/apos_login.html"
}

// Função para redirecionar para a página de edição de perfil
function editarPerfil() {
    window.location.href = 'editarPerfil/editarPerfil.html';
}

