document.addEventListener("DOMContentLoaded", function () {
    // Recuperar as informações do livro armazenadas no sessionStorage
    const livro = JSON.parse(sessionStorage.getItem('livroEmContato'));

    if (livro) {
        // Preencher as informações do livro na tela
        document.getElementById('livroCapa').src = `http://localhost:3000/${livro.capa}`;
        document.getElementById('livroTitulo').textContent = livro.titulo;
        document.getElementById('livroGenero').textContent = `Gênero: ${livro.genero}`;
        document.getElementById('livroEstado').textContent = `Estado: ${livro.estado}`;
        document.getElementById('livroDono').textContent = `Dono: ${livro.dono}`; // Corrigido para 'livro.dono'
    } else {
        // Caso não encontre o livro no sessionStorage, redireciona para a página inicial ou outra página
        window.location.href = 'index.html';
    }

    // Ação ao clicar no botão "Iniciar Conversa"
    document.getElementById('iniciarConversa').addEventListener('click', async function () {
        const livro = JSON.parse(sessionStorage.getItem('livroEmContato'));
        const baseUrl = await getAPIURL();
        const usuario = getUsuarioLogado();   

        const id = getQueryString('idLivro');

        const otherUserBooks = getOtherUserBooks();
        const book = otherUserBooks[id];

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const response = await fetch(`${baseUrl}/contato`, {
            method: "POST",
            body: JSON.stringify({
                id_livro: book.id,
                id_iniciador: usuario.userId,
                id_dono_livro: book.id_pessoa
            }),
            headers: myHeaders,
        });

        if (response.ok) {
            const contato = await response.json();
            saveContacts(contato);
            
            window.location.href = `../mensagens/mensagens.html?idContato=${contato.id}`; 
        } else {
            alert(`deu erro: ${response.statusText}`);
        }
        
        // Redirecionar para a tela de mensagens
        // window.location.href = '../mensagens/mensagens.html';
    });
});

  // Função para voltar à página anterior
  function voltarPaginaAnterior() {
    window.history.back();
}

