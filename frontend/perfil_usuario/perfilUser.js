// Abrir e fechar o menu lateral
const menuButton = document.getElementById('menu');
const sideMenu = document.getElementById('sideMenu');
const closeMenuButton = document.getElementById('closeMenu');

menuButton.addEventListener('click', () => {
    sideMenu.classList.add('visible');
});

closeMenuButton.addEventListener('click', () => {
    sideMenu.classList.remove('visible');
});

// Carregar informações do usuário logado do sessionStorage
const nomeUsuario = document.getElementById('nomeUsuario');
const emailUsuario = document.getElementById('emailUsuario');
const dataNascimento = document.getElementById('dataNascimento');
const endereco = document.getElementById('endereco');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const saveButton = document.querySelector('.save-button');

// Função para preencher o perfil automaticamente ao carregar a página
window.onload = function () {
    const usuarioAtual = JSON.parse(sessionStorage.getItem("currentUser"));

    console.log("usuarioAtual: ", usuarioAtual);

    if (usuarioAtual) {
        nomeUsuario.textContent = usuarioAtual.nome || 'Não informado';
        emailUsuario.textContent = usuarioAtual.email || 'Não informado';
        
        fetch('http://localhost:3000/pessoa/' + usuarioAtual.userId, { // Certifique-se de que esta URL está correta
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {                
                dataNascimento.textContent = data.data_nascimento || 'Não informado';
                endereco.textContent = data.endereco || 'Não informado';
                bairro.textContent = data.bairro || 'Não informado';
                cidade.textContent = data.cidade || 'Não informado';                
            })
            .catch(error => {
                msgError.setAttribute('style', 'display: block');
                msgError.innerHTML = 'Erro: ' + error.message;
            });
    } else {
        nomeUsuario.textContent = 'Não informado ainda';
        emailUsuario.textContent = 'Não informado ainda';
    }

    // Desabilita o botão de salvar inicialmente
    // saveButton.disabled = true;

    // Adiciona event listeners para detectar alterações nos campos editáveis
    [dataNascimento, endereco, bairro, cidade].forEach((campo) => {
        campo.addEventListener('input', verificarAlteracoes);
    });
};

// Função para verificar se houve alterações nos campos
function verificarAlteracoes() {
    const usuarioAtual = JSON.parse(sessionStorage.getItem('currentUser'));

    // Verifica se os valores atuais são diferentes dos valores originais
    const hasChanges = (
        dataNascimento.value !== (usuarioAtual.dataNascimento || '') ||
        endereco.value !== (usuarioAtual.endereco?.logradouro || '') ||
        bairro.value !== (usuarioAtual.endereco?.bairro || '') ||
        cidade.value !== (usuarioAtual.endereco?.cidade || '')
    );

    // Ativa o botão de salvar se houver mudanças, caso contrário desativa
    saveButton.disabled = !hasChanges;
}

 // Função para voltar à página anterior
 function voltarPaginaAnterior() {
    window.history.back();
}

// Função para redirecionar para a página de edição de perfil
function editarPerfil() {
    window.location.href = 'editarPerfil/editarPerfil.html'; // Redireciona para a página de edição de perfil
}

