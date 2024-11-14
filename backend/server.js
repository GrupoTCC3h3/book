import express from 'express';
import dotenv from 'dotenv';
import usuario from './routes/usuario.js';
import pessoas from './routes/pessoa.js';
import contato from './routes/contato.js';
import livro from './routes/livro.js';
import troca from './routes/troca.js';
import mensagem from './routes/mensagem.js';
import { sequelize } from './db/database.js';
import swaggerUI from 'swagger-ui-express';
import swagger from './swagger/swagger.js';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import './util/associations.js';
import Livro from './model/livro.js';
import { Pessoa } from './model/pessoa.js';
import { Usuario } from './model/usuario.js';
import { createServer } from 'http';
import { Server as socketIo } from 'socket.io';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);
const io = new socketIo(httpServer, { 
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors({
    origin: '*' // Ajuste conforme necessário para produção
}));

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados foi bem-sucedida!');
    })
    .catch((error) => {
        console.error('Não foi possível conectar ao banco de dados:', error);
    });

app.use("/usuario", usuario);
app.use("/pessoa", pessoas);
app.use("/contato", contato);
app.use("/livro", livro);
app.use("/troca", troca);
app.use("/mensagem", mensagem);

// Servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static('uploads'));
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swagger));

io.on('connection', (socket) => {
    console.log('Usuário conectado:', socket.id);

    socket.on('enviar-mensagem', async (dadosMensagem) => {
        try {
            const { mensagem, id_remetente, id_destinatario } = dadosMensagem;

            if (!id_remetente || !id_destinatario || !mensagem) {
                throw new Error('Faltando informações necessárias.');
            }

            // Salvar a mensagem no banco de dados
            const novaMensagem = await Mensagem.create({
                mensagem,
                id_remetente,
                id_destinatario,
                criado_em: new Date(),
            });

            console.log('Mensagem salva:', novaMensagem);

            // Enviar a nova mensagem ao destinatário
            socket.broadcast.emit(`nova-mensagem-${id_destinatario}`, { mensagem, id_remetente, id_destinatario });

        } catch (error) {
            console.error('Erro ao salvar a mensagem:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado:', socket.id);
    });
});


// Cadastro de livro
app.post('/livro/cadastrar', upload.single('capa_livro'), async (req, res) => {
    const { titulo, estado, ano_lancamento, autor, genero, id_pessoa } = req.body;
    const capa = req.file ? req.file.path : null;

    if (!id_pessoa) {
        return res.status(400).json({ error: 'ID da pessoa não foi enviado.' });
    }

    const pessoa = await Pessoa.findByPk(id_pessoa);
    if (!pessoa) {
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
        res.status(201).json({ message: 'Livro cadastrado com sucesso!', livro: novoLivro });
    } catch (error) {
        console.error('Erro ao cadastrar livro:', error);
        res.status(500).json({ error: 'Erro ao cadastrar livro.' });
    }
});

// Obter livro por ID
app.get('/livro/:id', async (req, res) => {
    const livroId = req.params.id;

    try {
        const livro = await Livro.findByPk(livroId);
        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }
        res.status(200).json(livro);
    } catch (error) {
        console.error('Erro ao buscar o livro:', error);
        res.status(500).json({ message: 'Erro ao buscar o livro.' });
    }
});

// Deletar livro
app.delete('/livro/:id', async (req, res) => {
    const livroId = req.params.id;

    try {
        const livro = await Livro.findByPk(livroId);
        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }
        await livro.destroy();
        res.status(200).json({ message: 'Livro deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
        res.status(500).json({ message: 'Erro ao deletar livro.' });
    }
});

// Atualizar livro
app.put("/livro/:id", async (req, res) => {
    const livroId = req.params.id;
    const { titulo, autor, genero, ano_lancamento } = req.body;

    try {
        const livro = await Livro.findByPk(livroId);
        if (!livro) {
            return res.status(404).json({ message: "Livro não encontrado" });
        }

        livro.titulo = titulo;
        livro.autor = autor;
        livro.genero = genero;
        livro.ano_lancamento = ano_lancamento;

        await livro.save();
        return res.status(200).json({ message: "Livro atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar o livro:", error);
        return res.status(500).json({ message: "Erro ao atualizar o livro" });
    }
});

// Listar livros disponíveis
app.get('/livros-disponiveis', async (req, res) => {
    try {
        const livros = await Livro.findAll({
            include: [
                {
                    model: Pessoa,
                    required: true,
                    include: [{
                        model: Usuario,
                        required: true
                    }]
                }
            ]
        });

        if (livros.length === 0) {
            return res.status(404).json({ message: 'Nenhum livro disponível.' });
        }

        res.status(200).json(livros);
    } catch (error) {
        console.error('Erro ao listar livros disponíveis:', error);
        res.status(500).json({ message: 'Erro ao listar livros disponíveis.' });
    }
});

sequelize.sync()
    .then(() => {
        httpServer.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((err) => console.error('Erro ao sincronizar o banco de dados:', err));
