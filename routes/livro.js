import express from 'express';
import multer from 'multer';
import path from 'path';
import Livro from '../model/livro.js';
import { Pessoa } from '../model/pessoa.js'; 
import { Usuario } from '../model/usuario.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
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
        if (!pessoa) return res.status(400).json({ error: 'ID do usuário não existe.' });

        const novoLivro = await Livro.create({ titulo, estado, ano_lancamento, autor, genero, id_pessoa, capa });
        res.status(201).json({ message: 'Livro cadastrado com sucesso!', livro: novoLivro });
    } catch (error) {
        console.error("Erro ao cadastrar livro:", error);
        res.status(500).json({ error: 'Erro ao cadastrar livro.' });
    }
});

router.get('/livro', async (req, res) => {
    try {
        const livros = await Livro.findAll({
            include: [{
                model: Pessoa,
                attributes: ['id_usuario'],
                include: [{ model: Usuario, attributes: ['nome'], required: true }],
                required: true
            }]
        });
        res.json(livros);
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        res.status(500).json({ error: 'Erro ao buscar livros.' });
    }
});

router.delete('/livro/:id', async (req, res) => {
    const { id } = req.params; // Obtém o ID do livro da URL

    try {
        // Verifica se o livro existe no banco de dados
        const livro = await Livro.findByPk(id);
        if (!livro) return res.status(404).json({ error: 'Livro não encontrado.' });

        // Apaga o livro
        await livro.destroy();
        res.status(200).json({ message: 'Livro apagado com sucesso!' });
    } catch (error) {
        console.error('Erro ao apagar o livro:', error);
        res.status(500).json({ error: 'Erro ao apagar o livro.' });
    }
});

router.get('/livro/:id', async (req, res) => {
    const { id } = req.params; // Extract book ID from URL
    try {
        const livro = await Livro.findByPk(id); // Fetch book from the database by ID
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado.' }); // Book not found
        }
        res.status(200).json(livro); // Return the book data
    } catch (error) {
        console.error('Erro ao buscar o livro:', error);
        res.status(500).json({ error: 'Erro ao buscar o livro.' });
    }
});

// Rota para listar livros disponíveis (livros em estado "otimo", "bom", "regular")
router.get('/livros-disponiveis', (req, res) => {
    const query = `
      SELECT livro.id, livro.titulo, livro.estado, livro.ano_lancamento, livro.autor, livro.genero, livro.capa,
             pessoa.id_usuario, usuario.nome AS nome_dono
      FROM livro
      LEFT JOIN pessoa ON pessoa.id_livro = livro.id
      LEFT JOIN usuario ON usuario.id = pessoa.id_usuario
      WHERE livro.estado IN ('otimo', 'bom', 'regular')
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao buscar livros:', err);
        return res.status(500).send('Erro ao buscar livros');
      }
      res.json(results); // Envia os livros em formato JSON
    });
});
  
export default router;
