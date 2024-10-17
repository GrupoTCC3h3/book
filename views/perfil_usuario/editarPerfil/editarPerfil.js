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

// Função para carregar informações do usuário ao abrir a página
window.onload = function() {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));

    // Verifica se o usuário está autenticado
    if (user) {
        // Carrega os dados do usuário nos campos
        document.getElementById('nomeUsuario').value = user.nome; // Use o nome do usuário
        document.getElementById('email').value = user.email; // Use o email do usuário

        // Preencher campos editáveis com dados existentes ou valores padrão
        document.getElementById('dataNascimento').value = user.dataNascimento || '';
        document.getElementById('endereco').value = user.endereco?.logradouro || '';
        document.getElementById('bairro').value = user.endereco?.bairro || '';
        document.getElementById('cidade').value = user.endereco?.cidade || '';

        // Desabilitar campos de nome e email
        document.getElementById('nomeUsuario').disabled = true;
        document.getElementById('email').disabled = true;
    } else {
        console.log("Usuário não autenticado.");
    }
};

// Função para lidar com o envio do formulário de edição de perfil
document.getElementById('editProfileForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar o envio padrão do formulário

    const user = JSON.parse(sessionStorage.getItem("currentUser"));

    // Pegar os valores dos campos que podem ser editados
    const dataNascimento = document.getElementById('dataNascimento').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;

    // Atualizar os dados do usuário com os novos valores
    user.dataNascimento = dataNascimento;
    user.endereco = {
        logradouro: endereco,
        bairro: bairro,
        cidade: cidade,
    };

    // Atualizar o `sessionStorage` com as novas informações
    sessionStorage.setItem("currentUser", JSON.stringify(user));

    // Mostrar mensagem de sucesso e redirecionar para a tela de perfil
    alert("Alterações salvas com sucesso!");
    window.location.href = "../perfilUser.html"; // Subir um nível e redirecionar para o perfil

});

// Função para voltar à página anterior
function voltarPaginaAnterior() {
    window.history.back();
}
