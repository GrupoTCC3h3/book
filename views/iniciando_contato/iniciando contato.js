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
    document.getElementById('iniciarConversa').addEventListener('click', function () {
        // Redirecionar para a tela de mensagens
        window.location.href = 'mensagens.html';  // Tela de mensagens em tempo real
    });
});
