const usuario = getUsuarioLogado(); // Verificando se o usuário está logado corretamente
let contato = null;

document.addEventListener("DOMContentLoaded", async function () {
  if (!usuario || !usuario.userId) {
    alert("Usuário não logado. Redirecionando para a página inicial.");
    window.location.href = "../index.html"; // Redireciona para a página inicial caso não esteja logado
    return;
  }
  await carregaContatos();
});

function showChat() {
  document.getElementById("inputContainer").style.display = "flex";
}

function exibeNomeUsuario(nome) {
  const nomeUsuarioChat = document.querySelector('.chat-header .contact-name'); // Seletor correto do nome no cabeçalho do chat
  nomeUsuarioChat.textContent = nome || "Nome não disponível"; // Atualiza o nome no cabeçalho
}

async function carregaContatos() {
  const baseUrl = await getAPIURL();
  try {
    const response = await fetch(`${baseUrl}/contato/destinatario?id_dono_livro=${usuario.userId}`);
    if (!response.ok) throw new Error("Erro ao carregar os contatos anteriores");
    const contatos = await response.json();
    mostraContatos(contatos);
  } catch (error) {
    console.error("Erro ao carregar contatos:", error);
    alert("Não foi possível carregar os contatos anteriores.");
  }
}

function mostraContatos(contatos) {
  const listaContatos = document.querySelector('.contact-list');
  listaContatos.innerHTML = ""; // Limpa os contatos antigos

  contatos.forEach(c => {
    const li = document.createElement('li');
    const linha = document.createElement('hr');
    li.classList.add("contact");

    let nomeDonoLivro = "Usuário desco";
    if (c.id_iniciador === usuario.userId && c.DonoLivro?.Usuario?.nome) {
      nomeDonoLivro = c.DonoLivro.Usuario.nome;
    } else if (c.Iniciador?.Usuario?.nome) {
      nomeDonoLivro = c.Iniciador.Usuario.nome;
    }

    li.addEventListener("click", () => {
      contato = c;
      carregaMensagens(c.id);
      exibeNomeUsuario(nomeDonoLivro);
    });

    const span = document.createElement('span');
    span.classList.add("contact-name");
    span.textContent = nomeDonoLivro;

    li.appendChild(span);
    listaContatos.appendChild(li);
    listaContatos.appendChild(linha);
  });
}

async function carregaMensagens(contatoId) {
  const baseUrl = await getAPIURL();
  try {
    const response = await fetch(`${baseUrl}/mensagem?id_contato=${contatoId}`);
    if (!response.ok) throw new Error("Erro ao carregar mensagens.");
    const mensagens = await response.json();
    mostraMensagens(mensagens);
  } catch (error) {
    console.error("Erro ao carregar mensagens:", error);
    alert("Não foi possível carregar as mensagens.");
  }
}

function mostraMensagens(mensagens) {
  const listaMensagens = document.querySelector('.messages');
  listaMensagens.innerHTML = ""; // Limpa as mensagens anteriores

  mensagens.forEach(mensagem => {
    // Determinar o nome do remetente ou destinatário
    let nomeUsuarioMensagem;
    if (mensagem.id_remetente === usuario.userId) {
      nomeUsuarioMensagem = ""; // Pode ser vazio se não precisar exibir o nome do remetente
    } else if (mensagem.id_remetente === contato.id_dono_livro && contato.DonoLivro?.Usuario?.nome) {
      nomeUsuarioMensagem = contato.DonoLivro.Usuario.nome;
    } else if (mensagem.id_remetente === contato.id_iniciador && contato.Iniciador?.Usuario?.nome) {
      nomeUsuarioMensagem = contato.Iniciador.Usuario.nome;
    } else {
      nomeUsuarioMensagem = "Usuário desconhecido";
    }

    // Criação do contêiner da mensagem
    const boxMensagem = document.createElement("div");
    boxMensagem.style = "display: flex; flex-direction: column; margin-bottom: 5px;";

    // Adiciona o nome do usuário acima da mensagem
    const nomeUsuario = document.createElement("span");
    nomeUsuario.textContent = nomeUsuarioMensagem;
    nomeUsuario.style = "font-size: 12px; color: gray; margin-bottom: 2px;";

    // Criação do texto da mensagem
    const textoMensagem = document.createElement("p");
    textoMensagem.textContent = mensagem.mensagem;
    textoMensagem.className = "txtMensagem"; // Classe padrão para estilização de mensagens
    
    // Adiciona classe baseada no remetente ou destinatário
    if (mensagem.id_remetente === usuario.userId) {
      textoMensagem.classList.add("remetente");
    } else {
      textoMensagem.classList.add("destinatario");
    }

    // Organiza elementos no contêiner da mensagem
    boxMensagem.appendChild(nomeUsuario);
    boxMensagem.appendChild(textoMensagem);
    listaMensagens.appendChild(boxMensagem);
  });

  showChat(); // Função para exibir o chat corretamente
}






async function enviarMensagem() {
  const mensagemInput = document.querySelector('.mensagem-input');
  const mensagem = mensagemInput.value.trim();

  if (!mensagem) {
    alert("Digite uma mensagem antes de enviar!");
    return;
  }

  const id_remetente = usuario.userId;
  const id_destinatario = contato.id_iniciador === usuario.userId
    ? contato.id_dono_livro
    : contato.id_iniciador;

  try {
    await dispatchMessage(id_remetente, id_destinatario, mensagem);
    mensagemInput.value = ""; // Limpa o campo após o envio
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    alert("Não foi possível enviar a mensagem.");
  }
}

async function dispatchMessage(id_remetente, id_destinatario, mensagem) {
  const baseUrl = await getAPIURL();
  const response = await fetch(`${baseUrl}/mensagem`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id_contato: contato.id,
      id_remetente,
      id_destinatario,
      mensagem
    })
  });

  if (!response.ok) throw new Error("Erro ao enviar mensagem.");
  await carregaMensagens(contato.id);
}

function voltarPaginaAnterior() {
  window.history.back();
}
