// Abrir e fechar o menu lateral
const menuButton = document.getElementById('menu');
const sideMenu = document.getElementById('sideMenu');
const closeMenuButton = document.getElementById('closeMenu');
const userName = document.getElementById('userName');
let pessoaId;

menuButton.addEventListener('click', () => {
    sideMenu.classList.add('visible');
});

closeMenuButton.addEventListener('click', () => {
    sideMenu.classList.remove('visible');
});

// Variável para armazenar os valores originais do perfil
let originalData = {};

// Função para carregar informações do usuário ao abrir a página
window.onload = function () {
    const usuario = JSON.parse(sessionStorage.getItem("currentUser"));

    if (usuario) {
        document.getElementById('nomeUsuario').value = usuario.nome;
        document.getElementById('email').value = usuario.email;

        fetch('http://localhost:3000/pessoa/' + usuario.userId, { // Certifique-se de que esta URL está correta
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById('dataNascimento').value = data.data_nascimento || '';
                document.getElementById('endereco').value = data.endereco || '';
                document.getElementById('bairro').value = data.bairro || '';
                document.getElementById('cidade').value = data.cidade || '';

                pessoaId = data.id;

                // Armazenando os valores originais
                originalData = {
                    dataNascimento: data.data_nascimento || '',
                    endereco: data.endereco || '',
                    bairro: data.bairro || '',
                    cidade: data.cidade || ''
                };
            })
            .catch(error => {
                msgError.setAttribute('style', 'display: block');
                msgError.innerHTML = 'Erro: ' + error.message;
            });
    }

};

// Desabilitar o botão "Salvar" até que algo seja alterado
const saveButton = document.querySelector('.save-button');
saveButton.disabled = true;

document.getElementById('editProfileForm').addEventListener('input', function () {
    const dataNascimento = document.getElementById('dataNascimento').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;

    // Habilitar o botão "Salvar" se houver alterações
    if (dataNascimento !== originalData.dataNascimento || endereco !== originalData.endereco ||
        bairro !== originalData.bairro || cidade !== originalData.cidade) {
        saveButton.disabled = false;
    } else {
        saveButton.disabled = true;
    }
});

// Função para lidar com o envio do formulário de edição de perfil
document.getElementById('editProfileForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar o envio padrão do formulário

    const dataNascimento = document.getElementById('dataNascimento').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;

    // Verificando se houve alteração nos dados
    if (dataNascimento !== originalData.dataNascimento || endereco !== originalData.endereco ||
        bairro !== originalData.bairro || cidade !== originalData.cidade) {

        fetch('http://localhost:3000/pessoa/' + pessoaId, { // Certifique-se de que esta URL está correta
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data_nascimento: dataNascimento,
                endereco,
                bairro,
                cidade
            }), // Converte os dados para JSON
        })
            .then(response => {
                if (response.ok) {
                    alert("Alterações salvas com sucesso!");
                    window.location.href = "../perfilUser.html"; // Redireciona para a página de perfil
                } else {
                    alert('Erro ao alterar perfil: ' + response.statusText);
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });


    } else {
        alert("Nenhuma alteração foi feita.");
    }
});

// Função para voltar à página anterior
function voltarPaginaAnterior() {
    window.history.back();
}
