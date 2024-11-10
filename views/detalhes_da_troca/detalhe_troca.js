 // Função para voltar à página anterior
 function voltarPaginaAnterior() {
    window.history.back();
}

document.addEventListener("DOMContentLoaded", function() {
    const trocaDetalhes = JSON.parse(sessionStorage.getItem('trocaDetalhes'));

    if (trocaDetalhes) {
        const detalhesTrocaElemento = document.getElementById('detalhesTroca');
        detalhesTrocaElemento.innerHTML = `
            <h2>Livro: ${trocaDetalhes.livro.titulo}</h2>
            <p><strong>Com:</strong> ${trocaDetalhes.dono.nome}</p>
            <p><strong>Estado:</strong> ${trocaDetalhes.livro.estado}</p>
            <p><strong>Gênero:</strong> ${trocaDetalhes.livro.genero}</p>
            <p><strong>Ano:</strong> ${trocaDetalhes.livro.ano}</p>
            <img src="http://localhost:3000/${trocaDetalhes.livro.capa}" alt="Capa do livro" class="capa-livro">
            <button id="voltar">Voltar</button>
        `;

        // Adicionando o evento de voltar para a página anterior
        document.getElementById('voltar').addEventListener('click', function() {
            window.history.back();
        });
    } else {
        alert("Detalhes da troca não encontrados.");
    }
});
