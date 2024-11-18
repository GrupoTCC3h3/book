document.addEventListener('DOMContentLoaded', function() {
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

    // Exibir Trocas Ativas
    function exibirTrocasAtivas() {
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
    function exibirTrocasCompletas() {
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
        trocasAtivas = trocasAtivas.filter(t => t.idLivro !== troca.idLivro);
        trocasConcluidas.push(troca);

        localStorage.setItem('trocasAtivas', JSON.stringify(trocasAtivas));
        localStorage.setItem('trocasConcluidas', JSON.stringify(trocasConcluidas));

        exibirTrocasAtivas();
        exibirTrocasCompletas();
    }

    // Cancelar Troca
    function cancelarTroca(troca) {
        trocasAtivas = trocasAtivas.filter(t => t.idLivro !== troca.idLivro);
        localStorage.setItem('trocasAtivas', JSON.stringify(trocasAtivas));

        exibirTrocasAtivas();
    }
});


function voltarPaginaAnterior(){
    window.history.back();
}
