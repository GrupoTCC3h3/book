const menuButton = document.getElementById('menu');
const sideMenu = document.getElementById('sideMenu');
const closeMenuButton = document.getElementById('closeMenu');

// Abrir o menu
menuButton?.addEventListener('click', function () {
    sideMenu.classList.remove('hidden');
    sideMenu.classList.add('visible');
});

// Fechar o menu
closeMenuButton?.addEventListener('click', function () {
    sideMenu.classList.remove('visible');
    sideMenu.classList.add('hidden');
});

// Mostrar imagem da capa
document.getElementById('inputCapa').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const img = document.getElementById('imgCapa');
        img.src = e.target.result;
        img.style.display = 'block';
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        img.style.display = 'none';
    }
});

document.getElementById('form_cadastrar_livros').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const titulo = document.getElementById('nome_livro').value;
    const estado = document.getElementById('cond_livro').value;
    const ano_lancamento = document.getElementById('ano_livro').value;
    const autor = document.getElementById('nome_autor').value;
    const genero = document.getElementById('genero_livro').value;
    const capa_livro = document.getElementById('inputCapa').files[0];

    // Obtém o ID do usuário logado
    const usuario = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!usuario) {
        alert('Usuário não está logado. Por favor, faça login.');
        return;
    }

    const id_pessoa = usuario.userId; 

    formData.append('titulo', titulo);
    formData.append('estado', estado);
    formData.append('ano_lancamento', ano_lancamento);
    formData.append('autor', autor);
    formData.append('genero', genero);
    formData.append('id_pessoa', id_pessoa); 
    if (capa_livro) {
        formData.append('capa_livro', capa_livro);
    }

    try {
        const response = await fetch('http://localhost:3000/livro/cadastrar', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (response.ok) {
            alert('Livro cadastrado com sucesso!');
            document.getElementById('form_cadastrar_livros').reset();
            document.getElementById('imgCapa').style.display = 'none'; // Ocultar imagem após cadastro
        } else {
            console.error('Erro ao cadastrar livro:', data);
            alert(data.error || 'Erro ao cadastrar livro.');
        }
    } catch (error) {
        // console.error('Erro ao cadastrar livro:', error);
        alert('Erro ao cadastrar livro.');
    }
});
