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

// Exibir o nome do usuário no menu
const ultimoUsuarioCadastrado = localStorage.getItem('ultimoUsuario');
if (ultimoUsuarioCadastrado) {
    userName.textContent = ultimoUsuarioCadastrado;
}

// Carregar informações do usuário ao abrir a página e manter os campos de nome e email desabilitados
window.onload = function() {
    const nomeUsuario = document.getElementById('nomeUsuario');
    const email = document.getElementById('email');
    const dataNascimento = document.getElementById('dataNascimento');
    const endereco = document.getElementById('endereco');
    const bairro = document.getElementById('bairro');
    const cidade = document.getElementById('cidade');

    // Preencher os campos desabilitados com os dados do cadastro
    nomeUsuario.value = localStorage.getItem('nomeUsuario') || '';
    email.value = localStorage.getItem('emailUsuario') || '';
    nomeUsuario.disabled = true;  // Campo de nome desabilitado
    email.disabled = true;        // Campo de email desabilitado

    // Preencher os demais campos com valores salvos ou vazios
    dataNascimento.value = localStorage.getItem('dataNascimento') || '';
    endereco.value = localStorage.getItem('endereco') || '';
    bairro.value = localStorage.getItem('bairro') || '';
    cidade.value = localStorage.getItem('cidade') || '';
};

// Função para lidar com o envio do formulário de edição de perfil
document.getElementById('editProfileForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar o envio padrão do formulário

    // Pegar os valores dos campos que podem ser editados
    const dataNascimento = document.getElementById('dataNascimento').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;

    // Verificar se todos os campos obrigatórios foram preenchidos
    if (dataNascimento === '' || endereco === '' || bairro === '' || cidade === '') {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Confirmar se o usuário quer salvar as alterações
    const confirmSave = confirm("Deseja realmente salvar as alterações?");
    if (confirmSave) {
        // Salvar as informações no localStorage
        localStorage.setItem('dataNascimento', dataNascimento);
        localStorage.setItem('endereco', endereco);
        localStorage.setItem('bairro', bairro);
        localStorage.setItem('cidade', cidade);

        // Redirecionar para a página de perfil após salvar
        window.location.href = 'file:///C:/tcc/book/views/perfil_usuario/perfilUser.html';
    }
});

// Função para voltar à página anterior
function voltarPaginaAnterior() {
    window.history.back();
}
