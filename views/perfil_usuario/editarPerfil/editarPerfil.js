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

// Função para carregar informações do usuário ao abrir a página
window.onload = function() {
    const nomeUsuario = document.getElementById('nomeUsuario');
    const email = document.getElementById('email');
    const dataNascimento = document.getElementById('dataNascimento');
    const endereco = document.getElementById('endereco');
    const bairro = document.getElementById('bairro');
    const cidade = document.getElementById('cidade');

    // Preencher os campos com os dados do cadastro
    nomeUsuario.value = localStorage.getItem('nomeUsuario') || '';
    email.value = localStorage.getItem('emailUsuario') || '';
    
    // Preencher campos editáveis com dados existentes ou valores padrão
    dataNascimento.value = localStorage.getItem('dataNascimento') || '';
    endereco.value = localStorage.getItem('endereco') || '';
    bairro.value = localStorage.getItem('bairro') || '';
    cidade.value = localStorage.getItem('cidade') || '';

    // Desabilitar campos de nome e email
    nomeUsuario.disabled = true;  // Campo de nome desabilitado
    email.disabled = true;        // Campo de email desabilitado
};

// Função para lidar com o envio do formulário de edição de perfil
document.getElementById('editProfileForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar o envio padrão do formulário

    // Pegar os valores dos campos que podem ser editados
    const dataNascimento = document.getElementById('dataNascimento').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;

    // Pegar os valores anteriores do localStorage
    const oldDataNascimento = localStorage.getItem('dataNascimento');
    const oldEndereco = localStorage.getItem('endereco');
    const oldBairro = localStorage.getItem('bairro');
    const oldCidade = localStorage.getItem('cidade');

    // Verificar se houve alguma alteração nos dados
    const hasChanges = (
        dataNascimento !== oldDataNascimento ||
        endereco !== oldEndereco ||
        bairro !== oldBairro ||
        cidade !== oldCidade
    );

    if (hasChanges) {
        // Confirmar se o usuário quer salvar as alterações
        const confirmSave = confirm("Deseja realmente salvar as alterações?");
        if (confirmSave) {
            // Salvar as informações no localStorage
            localStorage.setItem('dataNascimento', dataNascimento);
            localStorage.setItem('endereco', endereco);
            localStorage.setItem('bairro', bairro);
            localStorage.setItem('cidade', cidade);

            // Mostrar mensagem de sucesso
            alert("Alterações salvas com sucesso!");
            window.location.href = "file:///C:/tcc/book/views/perfil_usuario/perfilUser.html"
        }
    } else {
        // Não faz nada se não houver alterações
        console.log("Nenhuma alteração foi feita."); // Você pode remover esta linha ou manter para depuração
    }
});

// Função para voltar à página anterior
function voltarPaginaAnterior() {
    window.history.back();
}
