// Função para voltar à página anterior
function voltarPaginaAnterior() {
    window.history.back();
}

// Conectar ao servidor Socket.IO
const socket = io();

// Exibir o nome do dono no topo da tela
document.addEventListener("DOMContentLoaded", function () {
    const nomeDono = sessionStorage.getItem('nomeDono');
    if (nomeDono) {
        document.getElementById('donoNome').textContent = nomeDono;
    } else {
        document.getElementById('donoNome').textContent = 'Usuário desconhecido';
    }
});

// Função para enviar a mensagem
function enviarMensagem() {
    const mensagemInput = document.querySelector('.mensagem-input');  // Usa a classe do input
    const mensagem = mensagemInput.value;

    if (mensagem.trim() !== '') {
        socket.emit('enviar-mensagem', mensagem);  // Envia a mensagem
        mensagemInput.value = '';  // Limpa o campo de input após enviar
    } else {
        alert('Digite uma mensagem para enviar!');
    }
}

// Adiciona evento de "Enter" para enviar a mensagem
document.querySelector('.mensagem-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        enviarMensagem();
    }
});

socket.on('nova-mensagem', (mensagem) => {
    console.log('Nova mensagem recebida:', mensagem);

    // Atualize a interface do chat com a nova mensagem
    const chatContainer = document.querySelector('.chat-messages');  // Agora usa a classe corretamente
    const novaMensagem = document.createElement('div');
    novaMensagem.classList.add('mensagem');  // Adiciona a classe para estilização
    novaMensagem.textContent = mensagem;  // Define o texto da mensagem

    chatContainer.appendChild(novaMensagem);  // Adiciona a nova mensagem
    chatContainer.scrollTop = chatContainer.scrollHeight;  // Rola a tela para a última mensagem
});

