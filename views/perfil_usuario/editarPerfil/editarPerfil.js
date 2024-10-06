// Abrir e fechar o menu lateral
const menuButton = document.getElementById('menu');
const sideMenu = document.getElementById('sideMenu');
const closeMenuButton = document.getElementById('closeMenu');
const userName = document.getElementById('userName');

menuButton.addEventListener('click', () => {
    sideMenu.classList.add('visible');
});

closeMenuButton.addEventListener('click', () => {
    sideMenu.classList.remove('visible');
});

// Exibir o nome do usuário no menu
const ultimoUsuarioCadastrado = localStorage.getItem('ultimoUsuario');
if (ultimoUsuarioCadastrado) {
    userName.textContent = ultimoUsuarioCadastrado;
}

// Carregar informações do usuário ao abrir a página e armazenar os valores originais
let originalValues = {};

window.onload = function() {
    const nomeUsuario = document.getElementById('nomeUsuario');
    const email = document.getElementById('email');
    const dataNascimento = document.getElementById('dataNascimento');
    const endereco = document.getElementById('endereco');
    const bairro = document.getElementById('bairro');
    const cidade = document.getElementById('cidade');

    nomeUsuario.value = localStorage.getItem('nomeUsuario') || '';
    email.value = localStorage.getItem('emailUsuario') || '';
    dataNascimento.value = localStorage.getItem('dataNascimento') || '';
    endereco.value = localStorage.getItem('endereco') || '';
    bairro.value = localStorage.getItem('bairro') || '';
    cidade.value = localStorage.getItem('cidade') || '';

    // Armazenar os valores originais para comparação
    originalValues = {
        nomeUsuario: nomeUsuario.value,
        email: email.value,
        dataNascimento: dataNascimento.value,
        endereco: endereco.value,
        bairro: bairro.value,
        cidade: cidade.value
    };
};

// Logout
document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('ultimoUsuario');
    window.location.href = '../../index.html';
});

// Função para lidar com o envio do formulário de edição de perfil
document.getElementById('editProfileForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar o envio padrão do formulário

    // Verificar se há mudanças comparando os valores atuais com os originais
    const nomeUsuarioAtual = document.getElementById('nomeUsuario').value;
    const emailAtual = document.getElementById('email').value;
    const dataNascimentoAtual = document.getElementById('dataNascimento').value;
    const enderecoAtual = document.getElementById('endereco').value;
    const bairroAtual = document.getElementById('bairro').value;
    const cidadeAtual = document.getElementById('cidade').value;

    // Comparar valores originais com os atuais
    const houveAlteracao = (
        nomeUsuarioAtual !== originalValues.nomeUsuario ||
        emailAtual !== originalValues.email ||
        dataNascimentoAtual !== originalValues.dataNascimento ||
        enderecoAtual !== originalValues.endereco ||
        bairroAtual !== originalValues.bairro ||
        cidadeAtual !== originalValues.cidade
    );

    if (houveAlteracao) {
        const confirmSave = confirm("Deseja realmente salvar as alterações?");
        if (confirmSave) {
            // Armazenar as informações no localStorage
            localStorage.setItem('dataNascimento', dataNascimentoAtual);
            localStorage.setItem('endereco', enderecoAtual);
            localStorage.setItem('bairro', bairroAtual);
            localStorage.setItem('cidade', cidadeAtual);

            // Redirecionar para a página de perfil
            window.location.href = `/book/book/views/perfil_usuario/perfilUser.html?nome=${encodeURIComponent(nomeUsuarioAtual)}&email=${encodeURIComponent(emailAtual)}&data=${encodeURIComponent(dataNascimentoAtual)}&endereco=${encodeURIComponent(enderecoAtual)}&bairro=${encodeURIComponent(bairroAtual)}&cidade=${encodeURIComponent(cidadeAtual)}`;
        } else {
            console.log("Alterações não salvas.");
        }
    } else {
        console.log("Nenhuma alteração detectada.");
        // Se não houve alterações, pode-se decidir se o formulário é enviado ou apenas ignorado.
        // window.location.href = '/book/book/views/perfil_usuario/perfilUser.html'; // Se quiser redirecionar sem salvar.
    }
});

// Função para voltar à página anterior
function voltarPaginaAnterior() {
    window.history.back();
}
