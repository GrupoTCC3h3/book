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

// Função para cadastrar livro
document.getElementById('cadastrarLivro').addEventListener('click', function(event) {
    event.preventDefault();

    const nomeLivro = document.getElementById('nomeLivro').value;
    const autorLivro = document.getElementById('autorLivro').value;
    const imagemCapa = document.querySelector('input[type="file"]').files[0];

    // Aqui você deve salvar o livro em algum lugar (ex. localStorage, banco de dados, etc.)
    const livros = JSON.parse(localStorage.getItem('livros')) || [];
    const novoLivro = {
        nome: nomeLivro,
        autor: autorLivro,
        imagem: imagemCapa ? URL.createObjectURL(imagemCapa) : '',
    };
    
    livros.push(novoLivro);
    localStorage.setItem('livros', JSON.stringify(livros));

    alert("Livro cadastrado com sucesso")

    // Redirecionar para a tela de livros disponíveis
    // window.location.href = "../livros_disponiveis/livros_disponiveis.html"; // Ajuste o caminho se necessário
});
