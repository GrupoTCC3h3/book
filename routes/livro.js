import express from 'express';
import multer from 'multer';
import path from 'path';
import Livro from '../model/livro.js';
import { Usuario } from '../model/usuario.js'; // Importando o modelo de usuário

const router = express.Router();

// Configuração do multer para salvar imagens em uma pasta local chamada 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Pasta onde as imagens serão salvas
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome único para cada imagem
    }
});

const upload = multer({ storage: storage });

router.post('/cadastrar', upload.single('capa_livro'), async (req, res) => {
    const { titulo, estado, ano_lancamento, autor, genero, id_dono } = req.body; // id_dono
    const capa = req.file ? req.file.path : null;

    try {
        const usuario = await Usuario.findByPk(id_dono);
        if (!usuario) {
            return res.status(400).json({ error: 'ID do usuário não existe.' });
        }

        const novoLivro = await Livro.create({
            titulo,
            estado,
            ano_lancamento,
            autor,
            genero,
            id_usuario: id_dono, // Alterado de id_dono para id_usuario
            capa,
        });

        res.status(201).json({ message: 'Livro cadastrado com sucesso!', livro: novoLivro });
    } catch (error) {
        console.error("Erro ao cadastrar livro:", error); // Adicione um log de erro
        res.status(500).json({ error: 'Erro ao cadastrar livro.' });
    }
});

export default router;
