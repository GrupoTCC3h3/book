const mysql = require("mysql2");
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Use root
    password: '',  // Senha do root se houver
    database: 'bookswap_db'
});


// Conexão com o banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conectado ao MySQL com sucesso!');
    }
});

// Middleware para receber dados do formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota para processar o formulário de cadastro de livros
app.post('/cadastrar-livro', (req, res) => {
    const { nome_livro, genero_livro, cond_livro, nome_autor, ano_livro } = req.body;

    const query = `
        INSERT INTO livros (nome, genero, condicoes, autor, ano)
        VALUES (?, ?, ?, ?, ?)
    `;

    connection.query(query, [nome_livro, genero_livro, cond_livro, nome_autor, ano_livro], (err, result) => {
        if (err) {
            console.error('Erro ao inserir livro no banco de dados:', err);
            res.status(500).send('Erro ao cadastrar o livro.');
        } else {
            console.log('Livro cadastrado com sucesso:', result);
            res.send('Livro cadastrado com sucesso!');
        }
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
