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

// Variável para armazenar os valores originais do perfil
let originalData = {};

// Função para carregar informações do usuário ao abrir a página
window.onload = function() {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));

    if (user) {
        document.getElementById('nomeUsuario').value = user.nome;
        document.getElementById('email').value = user.email;
        document.getElementById('dataNascimento').value = user.dataNascimento || '';
        document.getElementById('endereco').value = user.endereco?.logradouro || '';
        document.getElementById('bairro').value = user.endereco?.bairro || '';
        document.getElementById('cidade').value = user.endereco?.cidade || '';

        // Armazenando os valores originais
        originalData = {
            dataNascimento: user.dataNascimento || '',
            endereco: user.endereco?.logradouro || '',
            bairro: user.endereco?.bairro || '',
            cidade: user.endereco?.cidade || ''
        };
    } else {
        console.log("Usuário não autenticado.");
    }
};

// Desabilitar o botão "Salvar" até que algo seja alterado
const saveButton = document.querySelector('.save-button');
saveButton.disabled = true;

document.getElementById('editProfileForm').addEventListener('input', function() {
    const dataNascimento = document.getElementById('dataNascimento').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;

    // Habilitar o botão "Salvar" se houver alterações
    if (dataNascimento !== originalData.dataNascimento || endereco !== originalData.endereco ||
        bairro !== originalData.bairro || cidade !== originalData.cidade) {
        saveButton.disabled = false;
    } else {
        saveButton.disabled = true;
    }
});

// Função para lidar com o envio do formulário de edição de perfil
document.getElementById('editProfileForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar o envio padrão do formulário

    const dataNascimento = document.getElementById('dataNascimento').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;

    // Verificando se houve alteração nos dados
    if (dataNascimento !== originalData.dataNascimento || endereco !== originalData.endereco ||
        bairro !== originalData.bairro || cidade !== originalData.cidade) {

        const user = JSON.parse(sessionStorage.getItem("currentUser"));

        // Atualizar os dados no `sessionStorage`
        user.dataNascimento = dataNascimento;
        user.endereco = { logradouro: endereco, bairro: bairro, cidade: cidade };
        sessionStorage.setItem("currentUser", JSON.stringify(user));

        alert("Alterações salvas com sucesso!");
        window.location.href = "../perfilUser.html"; // Redireciona para a página de perfil
    } else {
        alert("Nenhuma alteração foi feita.");
    }
});

// Função para voltar à página anterior
function voltarPaginaAnterior() {
    window.history.back();
}
