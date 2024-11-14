// Função para voltar à página anterior
function voltarPaginaAnterior() {
    window.history.back();
}

const usuario = getUsuarioLogado();
const idContato = getQueryString("idContato");
const contato = getContacts()[idContato];
alert(JSON.stringify(contato));

// Exibir o nome do dono no topo da tela
document.addEventListener("DOMContentLoaded", function () {
    const nomeDono = usuario.nome;
    if (nomeDono) {
        document.getElementById('donoNome').textContent = nomeDono;
    } else {
        document.getElementById('donoNome').textContent = 'Usuário desconhecido';
    }
});

// Função para enviar a mensagem
function enviarMensagem() {
    const mensagemInput = document.querySelector('.mensagem-input');
    const mensagem = mensagemInput.value;
    
    // Obtém os IDs de remetente e destinatário do sessionStorage ou de outra fonte dinâmica
    const id_remetente = sessionStorage.getItem('id_remetente');  // ID do remetente
    const id_destinatario = sessionStorage.getItem('id_destinatario');  // ID do destinatário

    if (mensagem.trim() !== '' && id_remetente && id_destinatario) {
        // Envia a mensagem com IDs de remetente e destinatário
        socket.emit('enviar-mensagem', { mensagem, id_remetente, id_destinatario });
        mensagemInput.value = '';  // Limpa o campo de input após enviar
    } else {
        alert('Digite uma mensagem e verifique os IDs de remetente e destinatário!');
    }
}

// Adiciona evento de "Enter" para enviar a mensagem
document.querySelector('.mensagem-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        enviarMensagem();
    }
});

