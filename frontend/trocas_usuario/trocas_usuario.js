document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM carregado");
    const usuarioAtual = JSON.parse(sessionStorage.getItem("currentUser"));

    let trocasAtivas = JSON.parse(localStorage.getItem('trocasAtivas')) || [];
    let trocasConcluidas = JSON.parse(localStorage.getItem('trocasConcluidas')) || [];

    if (usuarioAtual && usuarioAtual.nome) {
        document.getElementById('userName').textContent = usuarioAtual.nome;
        exibirTrocasAtivas();
        exibirTrocasCompletas();
    } else {
        document.getElementById('userName').textContent = "Usuário";
    }

    function exibirTrocasAtivas() {
        const listaTrocas = document.getElementById('listaTrocasAtivas');
        if (!listaTrocas) {
            console.error('Elemento #listaTrocasAtivas não encontrado');
            return;
        }

        listaTrocas.innerHTML = '';

        if (trocasAtivas.length === 0) {
            listaTrocas.innerHTML = 'Você ainda não possui trocas ativas.';
            return;
        }

        trocasAtivas.forEach(troca => {
            const divTroca = document.createElement('div');
            divTroca.className = 'troca-card';
            divTroca.innerHTML = `
                <h4>${troca.livro}</h4>
                <p>Dono: ${troca.dono}</p>
                <p>Gênero: ${troca.genero}</p>
                <p>Estado: ${troca.estado}</p>
                <p>Status: ${troca.status}</p>
            `;
            listaTrocas.appendChild(divTroca);
        });
    }

    function exibirTrocasCompletas() {
        const listaTrocasCompletas = document.getElementById('listaTrocasCompletas');
        if (!listaTrocasCompletas) {
            console.error('Elemento #listaTrocasCompletas não encontrado');
            return;
        }

        listaTrocasCompletas.innerHTML = '';

        if (trocasConcluidas.length === 0) {
            listaTrocasCompletas.innerHTML = 'Você ainda não possui trocas completas.';
            return;
        }

        trocasConcluidas.forEach(troca => {
            const divTroca = document.createElement('div');
            divTroca.className = 'troca-card';
            divTroca.innerHTML = `
                <h4>${troca.livro}</h4>
                <p>Dono: ${troca.dono}</p>
                <p>Gênero: ${troca.genero}</p>
                <p>Estado: ${troca.estado}</p>
                <p>Status: ${troca.status}</p>
            `;
            listaTrocasCompletas.appendChild(divTroca);
        });
    }

    async function carregarLivros() {
        try {
            if (!usuarioAtual || !usuarioAtual.userId) {
                throw new Error('Usuário não logado');
            }

            const baseUrl = await getAPIURL();
            const response = await fetch(`${baseUrl}/livro/otherUsers?id_pessoa=${usuarioAtual.userId}`);
            if (!response.ok) throw new Error('Erro ao buscar livros');

            const livros = await response.json();
            if (!Array.isArray(livros)) throw new Error('Formato de dados inválido para os livros');

            localStorage.setItem('livrosDeOutrosUsuarios', JSON.stringify(livros));
            exibirLivros(livros); // Chama a função para exibir os livros na tela
        } catch (error) {
            console.error('Erro ao carregar livros:', error);
        }
    }

    function exibirLivros(livros) {
        const listaLivros = document.getElementById('listaLivros');
        
        console.log('Elemento #listaLivros:', listaLivros); // Log para depuração

        if (!listaLivros) {
            console.error('Elemento #listaLivros não encontrado');
            return;
        }

        listaLivros.innerHTML = '';

        if (livros.length === 0) {
            listaLivros.innerHTML = 'Nenhum livro encontrado.';
            return;
        }

        livros.forEach(livro => {
            const divLivro = document.createElement('div');
            divLivro.className = 'livro-card';
            divLivro.innerHTML = `
                <h4>${livro.titulo}</h4>
                <p>Autor: ${livro.autor}</p>
                <p>Gênero: ${livro.genero}</p>
                <p>Ano: ${livro.ano_lancamento}</p>
                <p>Estado: ${livro.estado}</p>
                <img src="${livro.capa}" alt="${livro.titulo}" />
            `;
            listaLivros.appendChild(divLivro);
        });
    }

    carregarLivros();
});
