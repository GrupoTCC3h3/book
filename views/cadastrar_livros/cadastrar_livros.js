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
        img.style.display = 'block'; // Mostra a imagem
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

    // Obtém o ID do usuário do sessionStorage
    const user = JSON.parse(sessionStorage.getItem('currentUser')); 
    let pessoaId;

    try {
        pessoaId = await getIdPessoa();        
    } catch (error) {
        alert('Usuário não está logado. Por favor, faça login.');
        return;
    }

    // Corrigindo para usar id_pessoa
    formData.append('titulo', titulo);
    formData.append('estado', estado);
    formData.append('ano_lancamento', ano_lancamento);
    formData.append('autor', autor);
    formData.append('genero', genero);
    formData.append('id_pessoa', pessoaId);  // Alterado para id_pessoa
    if (capa_livro) {
        formData.append('capa_livro', capa_livro);
    }

    // Log de depuração
    console.log('Form Data:', {
        titulo,
        estado,
        ano_lancamento,
        autor,
        genero,
        id_pessoa: pessoaId,
        capa_livro
    });

    try {
        const response = await fetch('http://localhost:3000/livro/cadastrar', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (response.ok) {
            alert('Livro cadastrado com sucesso!');
            document.getElementById('form_cadastrar_livros').reset();
        } else {
            console.error('Erro ao cadastrar livro:', data);
            alert(data.error || 'Erro ao cadastrar livro.');
        }
    } catch (error) {
        console.error('Erro ao cadastrar livro:', error);
        alert('Erro ao cadastrar livro.');
    }
});

function voltarPaginaAnterior() {
    window.history.back();
}

const getIdPessoa = async () => {
    const usuario = JSON.parse(sessionStorage.getItem("currentUser"));

    if (usuario) {
        const response =  await fetch('http://localhost:3000/pessoa/' + usuario.userId, {
            method: 'GET'
        });

        if (response.ok) {
            const pessoa = response.json();

            return pessoa.id;
        } else {
            throw Error(`Erro ao consultar a pessoa: ${response.statusText}`);
        }
    }

    throw Error("Não foi possível capturar o usuário");
}