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

// Previsualização da imagem de capa
document.querySelector('input[type="file"]').addEventListener('change', function(event) {
    const preview = document.querySelector('.imagem_capa img');
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Logout
document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('ultimoUsuario');
    window.location.href = '../index.html';
});

// Função para lidar com o envio do formulário de edição de perfil
document.getElementById('editProfileForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar o envio padrão do formulário

    // Mostrar um alerta de confirmação
    const confirmSave = confirm("Deseja realmente salvar as alterações?");

    if (confirmSave) {
        // Se o usuário confirmar, você pode redirecioná-lo para a página de perfil
        // Aqui, você pode simular um redirecionamento. Substitua pela URL real da página de perfil.
        const nomeUsuario = document.getElementById('nomeUsuario').value;
        const email = document.getElementById('email').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const endereco = document.getElementById('endereco').value;
        const bairro = document.getElementById('bairro').value;
        const cidade = document.getElementById('cidade').value;

        // Aqui você pode armazenar as informações em um banco de dados ou localStorage
        // Para fins de exemplo, estamos apenas redirecionando

        // Substitua 'perfil.html' pela URL real da sua página de perfil
        window.location.href = `/perfilUSer.html?nome=${encodeURIComponent(nomeUsuario)}&email=${encodeURIComponent(email)}&data=${encodeURIComponent(dataNascimento)}&endereco=${encodeURIComponent(endereco)}&bairro=${encodeURIComponent(bairro)}&cidade=${encodeURIComponent(cidade)}`;
    } else {
        // Se o usuário cancelar, você pode opcionalmente adicionar alguma lógica aqui
        console.log("Alterações não salvas.");
    }
});

// Função para voltar à página anterior
function voltarPaginaAnterior() {
    window.history.back();
}

