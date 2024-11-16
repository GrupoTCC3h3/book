const usuario = getUsuarioLogado();
let contato = null;

document.addEventListener("DOMContentLoaded", async function () {
  await carregaContatos();
});

function showChat() {
  document.getElementById("inputContainer").style.display = "flex";
}

// Função para voltar à página anterior
function voltarPaginaAnterior() {
  window.history.back();
}


async function carregaContatos() {
  const baseUrl = await getAPIURL();
  const response = await fetch(`${baseUrl}/contato/destinatario?id_dono_livro=${usuario.userId}`)

  if (!response.ok) {
    alert("Não foi possível carregar os contatos anteriores");
    return;
  }

  mostraContatos(await response.json());
}


function mostraContatos(contatos) {
  const listaContatos = document.querySelector('.contact-list');
  Array.from(listaContatos.childNodes).forEach(node => node.remove()); //limpa todas as mensagens da div  

  contatos.forEach(c => {
    const li = document.createElement('li');
    li.classList.add("contact");
    li.addEventListener("click", () => {
      contato = c;
      carregaMensagens(c.id)
    });

    const div = document.createElement('div');
    div.classList.add("avatar");

    const span = document.createElement('span');
    span.classList.add("contact-name");
    span.textContent = c.Iniciador.Usuario.nome;

    li.appendChild(div);
    li.appendChild(span);

    listaContatos.appendChild(li);
  });
}

async function carregaMensagens(contatoId) {
  const baseUrl = await getAPIURL();
  const response = await fetch(`${baseUrl}/mensagem?id_contato=${contatoId}`);

  if (!response.ok) {
      alert("Não foi possível carregar as mensagens");
      return;
  }

  mostraMensagens(await response.json());
}


function mostraMensagens(mensagens) {
  const listaMensagens = document.querySelector('.messages');
  Array.from(listaMensagens.childNodes).forEach(node => node.remove()); //limpa todas as mensagens da div    

  mensagens.forEach(mensagem => {        
      const boxMensagem = document.createElement("div");
      boxMensagem.style = "display: flex; flex-direction: column; margin-bottom: 5px;";

      const textoMensagem = document.createElement("p");
      textoMensagem.textContent = mensagem.mensagem;

      if (mensagem.id_remetente == usuario.userId) {
          textoMensagem.style = "text-align: right;";
      }

      const linha = document.createElement("hr");
      linha.style = "width: 100%";

      boxMensagem.appendChild(textoMensagem);
      boxMensagem.appendChild(linha);

      listaMensagens.appendChild(boxMensagem);        
  });

  showChat();
}

async function enviarMensagem() {
  const mensagemInput = document.querySelector('.mensagem-input');
  const mensagem = mensagemInput.value;
  
  const id_remetente = usuario.userId;
  const id_destinatario = contato.id_iniciador;

  if (mensagem.trim() !== '' && id_remetente && id_destinatario) {
      await dispatchMessage(id_remetente, id_destinatario, mensagem);
      mensagemInput.value = '';  // Limpa o campo de input após enviar
  } else {
      alert('Digite uma mensagem e verifique os IDs de remetente e destinatário!');
  }
}

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

  await carregaMensagens(contato.id);
}