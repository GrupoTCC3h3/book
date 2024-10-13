// routes/livro.js
import express from 'express';
import Livro from '../model/livro.js';

const router = express.Router();

/**
 * @swagger
 * /livro:
 *   post:
 *     tags: [Livros]
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
 *               estado:
 *                 type: string
 *                 enum: [otimo, bom, regular, ruim]
 *               ano_lancamento:
 *                 type: integer
 *               autor:
 *                 type: string
 *               id_dono:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       400:
 *         description: Erro ao criar livro
 */
router.post('/', async (req, res) => {
    try {
        const { titulo, estado, ano_lancamento, autor, id_dono } = req.body; // Captura os dados do corpo da requisição
        const livro = await Livro.create({ titulo, estado, ano_lancamento, autor, id_dono });
        res.status(201).json(livro);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
