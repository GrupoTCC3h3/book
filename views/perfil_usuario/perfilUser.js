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

// Função para obter parâmetros da URL
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const regex = /([^&=]+)=([^&]*)/g;
    let m;

    while (m = regex.exec(queryString)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return params;
}

// Preencher os campos do perfil com os dados da URL
window.onload = function() {
    const userParams = getQueryParams();
    document.getElementById('nomeUsuario').innerText = userParams.nome || 'Nome não disponível';
    document.getElementById('email').innerText = userParams.email || 'Email não disponível';
    document.getElementById('dataNascimento').innerText = userParams.data || 'Data de nascimento não disponível';
    document.getElementById('endereco').innerText = userParams.endereco || 'Endereço não disponível';
    document.getElementById('bairro').innerText = userParams.bairro || 'Bairro não disponível';
    document.getElementById('cidade').innerText = userParams.cidade || 'Cidade não disponível';
};

function voltarPaginaAnterior() {
    window.history.back();
}

function editarPerfil(){
    window.location.href = 'editarPerfil/editarPerfil.html'
}