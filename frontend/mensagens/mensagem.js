// Função para voltar à página anterior
function voltarPaginaAnterior() {
    window.history.back();
}

// Recupera o usuário logado e o contato com base no parâmetro 'idContato' da URL
const usuario = getUsuarioLogado();
const contatoId = getQueryString("idContato");
const contato = getContacts()[contatoId];

// Verifica se o usuário e o contato estão definidos
if (!usuario) {
    alert('Usuário não está logado!');
    window.history.back();  // Retorna à página anterior, se o usuário não estiver logado
}
if (!contato) {
    alert('Contato não encontrado!');
    window.history.back();  // Retorna à página anterior, se o contato não for encontrado
}

// Exibir o nome do dono no topo da tela
document.addEventListener("DOMContentLoaded", async function () {
    const nomeDono = usuario.nome;
    if (nomeDono) {
        document.getElementById('donoNome').textContent = nomeDono;
    } else {
        document.getElementById('donoNome').textContent = 'Usuário desconhecido';
    }

    await carregaMensagens();
});

// Função para enviar a mensagem
async function enviarMensagem() {
    const mensagemInput = document.querySelector('.mensagem-input');
    const mensagem = mensagemInput.value;
    
    const id_remetente = usuario.userId;
    const id_destinatario = contato.id_dono_livro;

    // Verifica se a mensagem e os IDs estão presentes
    if (mensagem.trim() !== '' && id_remetente && id_destinatario) {
        await dispatchMessage(id_remetente, id_destinatario, mensagem);
        mensagemInput.value = '';  // Limpa o campo de input após enviar
    } else {
        alert('Digite uma mensagem e verifique os IDs de remetente e destinatário!');
    }
}

// Função para enviar a mensagem via API
async function dispatchMessage(id_remetente, id_destinatario, mensagem) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const baseUrl = await getAPIURL();
    const response = await fetch(`${baseUrl}/mensagem`, {
        method: "POST",
        body: JSON.stringify({
            id_contato: contato.id,
            id_remetente,
            id_destinatario,
            mensagem
        }),
        headers: myHeaders,
    });

    if (!response.ok) {
        alert("Não foi possível enviar a mensagem");
        return;
    }

    await carregaMensagens();
}

// Função para carregar as mensagens do contato
async function carregaMensagens() {
    const baseUrl = await getAPIURL();
    const response = await fetch(`${baseUrl}/mensagem?id_contato=${contato.id}`);

    if (!response.ok) {
        alert("Não foi possível carregar as mensagens");
        return;
    }

    const mensagens = await response.json();
    if (!mensagens || mensagens.length === 0) {
        // alert("Nenhuma mensagem encontrada!");
    }

    mostraMensagens(mensagens);
}

// Função para exibir as mensagens na tela
function mostraMensagens(mensagens) {
    const listaMensagens = document.querySelector('.box-messages');
    Array.from(listaMensagens.childNodes).forEach(node => node.remove()); // Limpa todas as mensagens da div

    mensagens.forEach(mensagem => {
        const boxMensagem = document.createElement("div");
        boxMensagem.style = "display: flex; flex-direction: column; margin-bottom: 5px;";

        const textoMensagem = document.createElement("p");
        textoMensagem.textContent = mensagem.mensagem;
        textoMensagem.className = "txtMensagem"; // Adiciona a classe base

        // Verifica se é o remetente ou destinatário
        if (mensagem.id_remetente === usuario.userId) {
            textoMensagem.classList.add("remetente"); // Classe do remetente
        } else {
            textoMensagem.classList.add("destinatario"); // Classe do destinatário
        }

        boxMensagem.appendChild(textoMensagem);

        listaMensagens.appendChild(boxMensagem);
    });
}

// Adiciona evento de "Enter" para enviar a mensagem
document.querySelector('.mensagem-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        enviarMensagem();
    }
});
