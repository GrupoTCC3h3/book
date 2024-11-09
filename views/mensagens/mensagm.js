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
    const mensagemInput = document.getElementById('mensagemInput'); // Obter o input de mensagem
    const mensagem = mensagemInput.value;

    if (mensagem.trim() !== '') {
        socket.emit('enviar-mensagem', mensagem);  // Envia a mensagem
        mensagemInput.value = '';  // Limpa o campo de input após enviar
    } else {
        alert('Digite uma mensagem para enviar!');
    }
}

// Receber novas mensagens e atualizar a interface do chat
socket.on('nova-mensagem', (mensagem) => {
    console.log('Nova mensagem recebida:', mensagem);

    // Atualize a interface do chat com a nova mensagem
    const chatContainer = document.getElementById('chatContainer');  // O contêiner de mensagens
    const novaMensagem = document.createElement('div');  // Cria um novo elemento para a mensagem
    novaMensagem.classList.add('mensagem');  // Adiciona uma classe (pode ser estilizada com CSS)
    novaMensagem.textContent = mensagem;  // Define o texto da nova mensagem

    chatContainer.appendChild(novaMensagem);  // Adiciona a mensagem ao contêiner de mensagens
    chatContainer.scrollTop = chatContainer.scrollHeight;  // Rola a tela para mostrar a nova mensagem
});
