import express from 'express';
import dotenv from 'dotenv';
import usuario from './routes/usuario.js';
import pessoas from './routes/pessoa.js';
import contato from './routes/contato.js';
import livro from './routes/livro.js';
import troca from './routes/troca.js';
import mensagem from './routes/mensagem.js';
import { sequelize } from './db/database.js'; // Usando a instância de sequelize do arquivo de banco de dados
import swaggerUI from 'swagger-ui-express';
import swagger from './swagger/swagger.js';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pasta para armazenar as capas dos livros
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renomeia o arquivo com um timestamp
    },
});

const upload = multer({ storage: storage });

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: '*' // Permitir todas as origens. Ajuste conforme necessário para produção.
}));

// Testar a conexão com o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados foi bem-sucedida!');
    })
    .catch((error) => {
        console.error('Não foi possível conectar ao banco de dados:', error);
    });

// Definindo as rotas
app.use("/usuario", usuario); 
app.use("/pessoa", pessoas);
app.use("/contato", contato);
app.use("/livro", livro);
app.use("/troca", troca); 
app.use("/mensagem", mensagem);

// Servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static('uploads'));
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swagger)); // Swagger já configurado aqui

app.post('/livro/cadastrar', upload.single('capa_livro'), async (req, res) => {
    console.log('Dados recebidos:', req.body); // Log dos dados recebidos
    console.log('Arquivo recebido:', req.file); // Log do arquivo da capa

    const { titulo, estado, ano_lancamento, autor, genero, id_pessoa } = req.body; // Altere para id_pessoa
    const capa = req.file ? req.file.path : null;

    // Verifique se id_pessoa é válido
    if (!id_pessoa) {
        console.error('ID da pessoa não foi enviado.');
        return res.status(400).json({ error: 'ID da pessoa não foi enviado.' });
    }

    const pessoa = await Pessoa.findByPk(id_pessoa);
    if (!pessoa) {
        console.error('ID da pessoa não existe:', id_pessoa);
        return res.status(400).json({ error: 'ID da pessoa não existe.' });
    }

    try {
        const novoLivro = await Livro.create({
            titulo,
            estado,
            ano_lancamento,
            autor,
            genero,
            id_pessoa, 
            capa,
        });

        console.log('Livro cadastrado com sucesso:', novoLivro);
        res.status(201).json({ message: 'Livro cadastrado com sucesso!', livro: novoLivro });
    } catch (error) {
        console.error('Erro ao cadastrar livro:', error);
        res.status(500).json({ error: 'Erro ao cadastrar livro.' });
    }
});


// Sincronizando com o banco de dados
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((err) => console.error('Erro ao sincronizar o banco de dados:', err));
