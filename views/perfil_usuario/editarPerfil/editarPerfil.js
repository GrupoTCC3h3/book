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
// const ultimoUsuarioCadastrado = localStorage.getItem('ultimoUsuario');
// if (ultimoUsuarioCadastrado) {
//     userName.textContent = ultimoUsuarioCadastrado;
// }

// Função para carregar informações do usuário ao abrir a página
window.onload = function() {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));

    userName.textContent = user.nomeCad;

    const nomeUsuario = document.getElementById('nomeUsuario');
    const email = document.getElementById('email');
    const dataNascimento = document.getElementById('dataNascimento');
    const endereco = document.getElementById('endereco');
    const bairro = document.getElementById('bairro');
    const cidade = document.getElementById('cidade');

    // Preencher os campos com os dados do cadastro
    nomeUsuario.value = user.nomeCad || '';
    email.value = user.userCad || '';
    
    // Preencher campos editáveis com dados existentes ou valores padrão
    dataNascimento.value = user.dataNascimento || '';
    endereco.value = user.endereco?.logradouro || '';
    bairro.value = user.endereco?.bairro || '';
    cidade.value = user.endereco?.cidade || '';

    // Desabilitar campos de nome e email
    nomeUsuario.disabled = true;  // Campo de nome desabilitado
    email.disabled = true;        // Campo de email desabilitado
};

// Função para lidar com o envio do formulário de edição de perfil
document.getElementById('editProfileForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar o envio padrão do formulário

    const user = JSON.parse(sessionStorage.getItem("currentUser"));

    // Pegar os valores dos campos que podem ser editados
    const dataNascimento = document.getElementById('dataNascimento').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;

    const oldDataNascimento = user.dataNascimento || '';
    const oldEndereco = user.endereco?.logradouro || '';
    const oldBairro = user.endereco?.bairro || '';
    const oldCidade = user.endereco?.cidade || '';

    // Verificar se houve alguma alteração nos dados
    const hasChanges = (
        dataNascimento !== oldDataNascimento ||
        endereco !== oldEndereco ||
        bairro !== oldBairro ||
        cidade !== oldCidade
    );

    if (hasChanges) {
        // Confirmar se o usuário quer salvar as alterações
        const confirmSave = confirm("Deseja realmente salvar as alterações?");
        if (confirmSave) {
            const listUsuarios = JSON.parse(localStorage.getItem("listaUser"));
            const posicao = listUsuarios.findIndex(u => u.userCad == user.userCad && u.senhaCad == user.senhaCad);

            user.dataNascimento = dataNascimento;
            user.endereco = {
                logradouro: endereco,
                bairro: bairro,
                cidade: cidade,
            }

            listUsuarios[posicao] = user;

            localStorage.setItem("listaUser", JSON.stringify(listUsuarios));
            sessionStorage.setItem("currentUser", JSON.stringify(user));

            // Mostrar mensagem de sucesso
            alert("Alterações salvas com sucesso!");
            window.location.href = "file:///C:/tcc/book/views/perfil_usuario/perfilUser.html";
        }
    } else {
        // Não faz nada se não houver alterações
        console.log("Nenhuma alteração foi feita."); // Você pode remover esta linha ou manter para depuração
    }
});

// Função para voltar à página anterior
function voltarPaginaAnterior() {
    window.history.back();
}
