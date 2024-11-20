document.addEventListener('DOMContentLoaded', function() {
    const usuarioAtual = JSON.parse(sessionStorage.getItem("currentUser"));

    // Verificar se o usuário está logado e carregar suas trocas
    if (usuarioAtual && usuarioAtual.nome) {
        document.getElementById('userName').textContent = usuarioAtual.nome;

        // Carregar as trocas ativas e concluídas para o usuário logado
        let trocasAtivas = JSON.parse(localStorage.getItem(`trocasAtivas_${usuarioAtual.userId}`)) || [];
        let trocasConcluidas = JSON.parse(localStorage.getItem(`trocasConcluidas_${usuarioAtual.userId}`)) || [];

        // Exibir as trocas
        exibirTrocasAtivas(trocasAtivas);
        exibirTrocasCompletas(trocasConcluidas);
    } else {
        document.getElementById('userName').textContent = "Usuário";
    }

    // Exibir Trocas Ativas
    function exibirTrocasAtivas(trocasAtivas) {
        const listaTrocas = document.getElementById('listaTrocasAtivas');
        listaTrocas.innerHTML = ''; // Limpa a lista antes de adicionar

        trocasAtivas.forEach(troca => {
            const trocaElemento = document.createElement('div');
            trocaElemento.className = 'troca-card';
            trocaElemento.innerHTML = `
                <img src="http://localhost:3000/${troca.capa}" alt="${troca.titulo}" class="troca-imagem">
                <div class="troca-info">
                    <h3>${troca.titulo}</h3>
                    <p>Gênero: ${troca.genero}</p>
                    <p>Estado: ${troca.estado}</p>
                    <p>Dono: ${troca.dono}</p>
                    <div class="troca-botoes">
                    <button class="confirmar-btn">Confirmar Recebimento</button>
                    <button class="cancelar-btn">Cancelar Troca</button>
                    </div>
                </div>
            `;
            // Adicionar eventos aos botões
            trocaElemento.querySelector('.confirmar-btn').addEventListener('click', () => confirmarTroca(troca));
            trocaElemento.querySelector('.cancelar-btn').addEventListener('click', () => cancelarTroca(troca));

            listaTrocas.appendChild(trocaElemento);
        });
    }

    // Exibir Trocas Concluídas
    function exibirTrocasCompletas(trocasConcluidas) {
        const listaConcluidas = document.getElementById('listaTrocasCompletas');
        listaConcluidas.innerHTML = ''; // Limpa a lista antes de adicionar

        trocasConcluidas.forEach(troca => {
            const trocaElemento = document.createElement('div');
            trocaElemento.className = 'troca-card';
            trocaElemento.innerHTML = `
                <img src="http://localhost:3000/${troca.capa}" alt="${troca.titulo}" class="troca-imagem">
                <div class="troca-info">
                    <h3>${troca.titulo}</h3>
                    <p>Gênero: ${troca.genero}</p>
                    <p>Estado: ${troca.estado}</p>
                    <p>Dono: ${troca.dono}</p>
                </div>
            `;
            listaConcluidas.appendChild(trocaElemento);
        });
    }

    // Confirmar Troca
    function confirmarTroca(troca) {
        let trocasAtivas = JSON.parse(localStorage.getItem(`trocasAtivas_${usuarioAtual.userId}`)) || [];
        let trocasConcluidas = JSON.parse(localStorage.getItem(`trocasConcluidas_${usuarioAtual.userId}`)) || [];

        trocasAtivas = trocasAtivas.filter(t => t.idLivro !== troca.idLivro);
        trocasConcluidas.push(troca);

        // Atualizar no localStorage
        localStorage.setItem(`trocasAtivas_${usuarioAtual.userId}`, JSON.stringify(trocasAtivas));
        localStorage.setItem(`trocasConcluidas_${usuarioAtual.userId}`, JSON.stringify(trocasConcluidas));

        exibirTrocasAtivas(trocasAtivas);
        exibirTrocasCompletas(trocasConcluidas);
    }

    // Cancelar Troca
    function cancelarTroca(troca) {
        let trocasAtivas = JSON.parse(localStorage.getItem(`trocasAtivas_${usuarioAtual.userId}`)) || [];

        trocasAtivas = trocasAtivas.filter(t => t.idLivro !== troca.idLivro);

        // Atualizar no localStorage
        localStorage.setItem(`trocasAtivas_${usuarioAtual.userId}`, JSON.stringify(trocasAtivas));

        exibirTrocasAtivas(trocasAtivas);
    }
});

function voltarPaginaAnterior(){
    window.history.back();
}
