const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para fazer o parsing do JSON enviado no corpo da requisição
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // Para parsing de dados do formulário

// Configuração da conexão MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Use root
    password: '',  // Deixe vazio se não houver senha
    database: 'bookswap_db'
});

// Verifica a conexão com o banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conectado ao MySQL com sucesso!');
    }
});

// Rota para cadastrar livros
app.post('/cadastrar-livro', (req, res) => {
    const { nome, genero, condicoes, autor, ano } = req.body;

    const sql = `INSERT INTO livros (nome, genero, condicoes, autor, ano) VALUES (?, ?, ?, ?, ?)`;

    connection.query(sql, [nome, genero, condicoes, autor, ano], (err, result) => {
        if (err) {
            console.error('Erro ao inserir livro no banco de dados:', err);
            res.status(500).json({ message: 'Erro ao cadastrar livro.' });
        } else {
            res.status(200).json({ message: 'Livro cadastrado com sucesso!' });
        }
    });
});

// Rota para buscar livros
app.get('/livros', (req, res) => {
    const query = 'SELECT * FROM livros';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar livros:', err.message);
            res.status(500).send('Erro ao buscar livros.');
        } else {
            res.json(results);
        }
    });
});

// Outras rotas para suas páginas
app.use(express.static('views'));

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
