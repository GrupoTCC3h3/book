const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve arquivos estáticos da pasta "views" (incluindo CSS, JS, imagens, etc.)
app.use(express.static('views'));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Outras rotas
app.get('/como-funciona', (req, res) => {
    res.sendFile(__dirname + '/views/comoFunciona/como-funciona.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login/login.html');
});

app.get('/cadastrar', (req, res) => {
    res.sendFile(__dirname + '/views/cadastro/cadastro.html');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
