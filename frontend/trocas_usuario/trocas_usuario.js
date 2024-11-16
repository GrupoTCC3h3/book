// Função para voltar à página anterior
function voltarPaginaAnterior() {
    window.history.back();
}

const usuarioAtual = JSON.parse(sessionStorage.getItem("currentUser"));

if (usuarioAtual && usuarioAtual.nome) {
    document.getElementById('userName').textContent = usuarioAtual.nome;
} else {
    document.getElementById('userName').textContent = "Usuário";
}

// Carregar trocas do localStorage ou inicializar como array vazio
let trocasAtivas = JSON.parse(localStorage.getItem('trocasAtivas')) || [];
let trocasConcluidas = JSON.parse(localStorage.getItem('trocasConcluidas')) || [];
let livrosDeOutrosUsuarios = JSON.parse(localStorage.getItem('livrosDeOutrosUsuarios')) || [];  // Carrega os livros de outros usuários

// Função para adicionar uma troca ativa
function adicionarTrocaAtiva(livro, dono, estado, genero, status = 'Troca Agendada') {
    // Verificar se o livro já existe nas trocas ativas do usuário logado
    const livroExistente = trocasAtivas.some(troca => troca.livro === livro && troca.usuario === usuarioAtual.nome);
    
    if (livroExistente) {
        alert("Este livro já está em uma troca ativa.");
        return; // Impede de adicionar o livro novamente
    }

    const novaTroca = {
        livro,
        dono,
        estado,
        genero,
        status,
        usuario: usuarioAtual.nome  // Associa a troca ao usuário logado
    };

    // Adiciona a nova troca no final do array
    trocasAtivas.push(novaTroca);

    // Remover o livro da lista de livros de outros usuários (se já estiver na lista)
    livrosDeOutrosUsuarios = livrosDeOutrosUsuarios.filter(l => l.titulo !== livro);

    // Armazena as trocas no localStorage para persistência
    localStorage.setItem('trocasAtivas', JSON.stringify(trocasAtivas));
    localStorage.setItem('livrosDeOutrosUsuarios', JSON.stringify(livrosDeOutrosUsuarios));  // Atualiza a lista de livros restantes
    
    // Exibe novamente todas as trocas ativas
    exibirTrocasAtivas();
}

// Função para exibir as trocas ativas
function exibirTrocasAtivas() {
    const listaTrocasAtivas = document.getElementById('listaTrocasAtivas');
    listaTrocasAtivas.innerHTML = ''; // Limpa a lista

    // Filtrar as trocas ativas do usuário logado
    const trocasUsuario = trocasAtivas.filter(troca => troca.usuario === usuarioAtual.nome);

    if (trocasUsuario.length === 0) {
        listaTrocasAtivas.innerHTML = '<p>Você ainda não iniciou nenhuma troca.</p>';
        return;
    }

    trocasUsuario.forEach((troca, index) => {
        const trocaDiv = document.createElement('div');
        trocaDiv.classList.add('troca');
        trocaDiv.innerHTML = `
            <div>
                <p><strong>Livro:</strong> ${troca.livro}</p>
                <p><strong>Com:</strong> ${troca.dono}</p>
                <p><strong>Estado:</strong> ${troca.estado}</p>
                <p><strong>Gênero:</strong> ${troca.genero}</p>'
                <p><strong>Status:</strong> ${troca.status}</p>
            </div>
            <div>
                <button class="botaoTroca" onclick="confirmarRecebimento(${index})">Confirmar Recebimento</button>
                <button class="botaoTroca" onclick="cancelarTroca(${index})">Cancelar Troca</button>
            </div>
        `;
        listaTrocasAtivas.appendChild(trocaDiv);
    });
}

// Função para confirmar recebimento
function confirmarRecebimento(index) {
    const confirmar = confirm("Tem certeza que deseja confirmar o recebimento da troca?");
    if (confirmar) {
        const trocaConcluida = trocasAtivas.splice(index, 1)[0];  // Remove da lista de trocas ativas
        trocaConcluida.status = 'Troca Concluída';
        
        // Adiciona a troca concluída ao array de trocas concluídas
        trocasConcluidas.push(trocaConcluida);
        
        // Atualiza o localStorage para as trocas ativas e concluídas
        localStorage.setItem('trocasAtivas', JSON.stringify(trocasAtivas));
        localStorage.setItem('trocasConcluidas', JSON.stringify(trocasConcluidas));
        
        // Atualiza as exibições das trocas
        exibirTrocasAtivas();
        exibirTrocasConcluidas();
    }
}

// Função para cancelar troca
function cancelarTroca(index) {
    const cancelar = confirm("Tem certeza que deseja cancelar a troca?");
    if (cancelar) {
        trocasAtivas.splice(index, 1);  // Remove a troca do array
        localStorage.setItem('trocasAtivas', JSON.stringify(trocasAtivas));
        exibirTrocasAtivas();
    }
}

// Função para exibir as trocas concluídas
function exibirTrocasConcluidas() {
    const listaTrocasConcluidas = document.getElementById('listaTrocasCompletas');  // Corrigido para o id correto

    listaTrocasConcluidas.innerHTML = ''; // Limpa a lista

    const trocasUsuarioConcluidas = trocasConcluidas.filter(troca => troca.usuario === usuarioAtual.nome);

    if (trocasUsuarioConcluidas.length === 0) {
        listaTrocasConcluidas.innerHTML = '<p>Nenhuma troca concluída até o momento.</p>';
        return;
    }

    trocasUsuarioConcluidas.forEach((troca) => {
        const trocaDiv = document.createElement('div');
        trocaDiv.classList.add('troca');
        trocaDiv.innerHTML = `
            <div>
                <p><strong>Livro:</strong> ${troca.livro}</p>
                <p><strong>Com:</strong> ${troca.dono}</p>
                <p><strong>Estado:</strong> ${troca.estado}</p>
                <p><strong>Gênero:</strong> ${troca.genero}</p>
                <p><strong>Status:</strong> ${troca.status}</p>
            </div>
        `;
        listaTrocasConcluidas.appendChild(trocaDiv);
    });
}

// Carregar e exibir as trocas ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    exibirTrocasAtivas();
    exibirTrocasConcluidas();

    // Adicionar livro ao iniciar contato
    const livroEmContato = JSON.parse(sessionStorage.getItem('livroEmContato'));
    if (livroEmContato) {
        adicionarTrocaAtiva(livroEmContato.titulo, livroEmContato.dono, livroEmContato.estado, livroEmContato.genero);
        sessionStorage.removeItem('livroEmContato');
    }
});
