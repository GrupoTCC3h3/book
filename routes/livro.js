import express from 'express';
import Livro from '../model/livro.js'; // Importação padrão

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Livro
 *   description: Gerenciamento de livros para troca
 */

/**
 * @swagger
 * /livro:
 *   get:
 *     tags: [Livro]
 *     summary: Retorna todos os livros
 *     responses:
 *       200:
 *         description: Lista de livros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   estado:
 *                     type: string
 *                     enum: [otimo, bom, regular, ruim]
 *                   ano_lancamento:
 *                     type: integer
 *                   autor:
 *                     type: string
 *                   id_dono:
 *                     type: integer
 *       500:
 *         description: Erro ao retornar os livros
 */
router.get('/', async (req, res) => {
    try {
        const livros = await Livro.findAll();
        res.json(livros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /livro:
 *   post:
 *     tags: [Livro]
 *     summary: Cria um novo livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título do livro
 *               estado:
 *                 type: string
 *                 enum: [otimo, bom, regular, ruim]
 *               ano_lancamento:
 *                 type: integer
 *                 description: Ano de lançamento do livro
 *               autor:
 *                 type: string
 *                 description: Autor do livro
 *               id_dono:
 *                 type: integer
 *                 description: ID da pessoa que é dona do livro
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       400:
 *         description: Erro ao criar o livro
 */
router.post('/', async (req, res) => {
    try {
        const livro = await Livro.create(req.body);
        res.status(201).json(livro); // Retorna o livro criado
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router; // Exportando as rotas
