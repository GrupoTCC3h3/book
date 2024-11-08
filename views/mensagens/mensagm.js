  // Função para voltar à página anterior
  function voltarPaginaAnterior() {
    window.history.back();
}
// Conectar ao servidor Socket.IO
const socket = io();

// Enviar mensagem
function enviarMensagem(mensagem) {
    socket.emit('enviar-mensagem', mensagem);
}

// Receber novas mensagens
socket.on('nova-mensagem', (mensagem) => {
    console.log('Nova mensagem recebida:', mensagem);
    // Atualize a interface do chat com a nova mensagem
});

 
 // Função para voltar à página anterior
 function voltarPaginaAnterior() {
    window.history.back();
}