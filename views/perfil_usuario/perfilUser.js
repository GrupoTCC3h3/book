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

// Carregar informações do usuário do localStorage
const nomeUsuario = document.getElementById('nomeUsuario');
const emailUsuario = document.getElementById('emailUsuario');
const dataNascimento = document.getElementById('dataNascimento');
const endereco = document.getElementById('endereco');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');

// Função para preencher o perfil automaticamente ao carregar a página
window.onload = function () {
    const nome = localStorage.getItem('nomeUsuario');
    const email = localStorage.getItem('emailUsuario');
    const dataNasc = localStorage.getItem('dataNascimento');
    const end = localStorage.getItem('endereco');
    const b = localStorage.getItem('bairro');
    const c = localStorage.getItem('cidade');

    // Exibir informações
    nomeUsuario.textContent = nome ? nome : 'Nome não disponível';
    emailUsuario.textContent = email ? email : 'Email não disponível';
    dataNascimento.textContent = dataNasc ? dataNasc : 'Data não disponível';
    endereco.textContent = end ? end : 'Endereço não disponível';
    bairro.textContent = b ? b : 'Bairro não disponível';
    cidade.textContent = c ? c : 'Cidade não disponível';
};

// Logout
document.getElementById('logout').addEventListener('click', function () {
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
    window.document.location.href = "../apos_login/apos_login.html";
}

// Função para redirecionar para a página de edição de perfil
function editarPerfil() {
    // Redireciona para a página de edição de perfil
    window.location.href = 'editarPerfil/editarPerfil.html';
}

// Função para salvar as informações editadas no localStorage
function salvarEdicao() {
    const nomeEditado = document.getElementById('editNome').value;
    const emailEditado = document.getElementById('editEmail').value;
    const dataNascEditado = document.getElementById('editDataNasc').value;
    const enderecoEditado = document.getElementById('editEndereco').value;
    const bairroEditado = document.getElementById('editBairro').value;
    const cidadeEditada = document.getElementById('editCidade').value;

    // Atualiza as informações no localStorage
    localStorage.setItem('nomeUsuario', nomeEditado);
    localStorage.setItem('emailUsuario', emailEditado);
    localStorage.setItem('dataNascimento', dataNascEditado);
    localStorage.setItem('endereco', enderecoEditado);
    localStorage.setItem('bairro', bairroEditado);
    localStorage.setItem('cidade', cidadeEditada);

    // Retorna para a página de perfil
    window.location.href = 'file:///C:/tcc/book/views/perfil_usuario/perfilUser.html';
}

// Adicione a função para voltar ao início (defina seu comportamento conforme necessário)
function voltarInicio() {
    window.location.href = '../index.html'; // Ajuste para a página inicial do seu site
}
