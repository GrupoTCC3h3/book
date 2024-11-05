// routes/livro.js

import express from 'express';
import multer from 'multer';
import path from 'path';
import Livro from '../model/livro.js';
import { Pessoa } from '../model/pessoa.js'; 
import { Usuario } from '../model/usuario.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/cadastrar', upload.single('capa_livro'), async (req, res) => {
    const { titulo, estado, ano_lancamento, autor, genero, id_pessoa } = req.body;
    const capa = req.file ? req.file.path : null;

    try {
        const pessoa = await Pessoa.findByPk(id_pessoa);
        if (!pessoa) {
            return res.status(400).json({ error: 'ID do usuário não existe.' });
        }

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
        console.error("Erro ao cadastrar livro:", error);
        res.status(500).json({ error: 'Erro ao cadastrar livro.' });
    }
});

router.get('/livro', async (req, res) => {
    try {
        const livros = await Livro.findAll({
            attributes: ['titulo', 'genero', 'estado', 'capa'],
            include: [
                {
                    model: Pessoa,
                    attributes: ['id_usuario'],
                    include: [
                        {
                            model: Usuario,
                            attributes: ['nome'],
                            required: true
                        }
                    ],
                    required: true
                }
            ]
        });

        res.json(livros);
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        res.status(500).json({ error: 'Erro ao buscar livros.' });
    }
});

export default router;
