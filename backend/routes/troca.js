import express from 'express';
import Troca from '../model/troca.js'; // Importação padrão

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Troca
 *   description: Gerenciamento de trocas de livros
 */

/**
 * @swagger
 * /troca:
 *   get:
 *     tags: [Troca]
 *     summary: Retorna todas as trocas
 *     responses:
 *       200:
 *         description: Lista de trocas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   id_livro:
 *                     type: integer
 *                   id_dono_livro:
 *                     type: integer
 *                   id_quem_quer_trocar:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *                     enum: [pendente, confirmada, cancelada]
 *       500:
 *         description: Erro ao retornar as trocas
 */
router.get('/', async (req, res) => {
    try {
        const trocas = await Troca.findAll();
        res.json(trocas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /troca:
 *   post:
 *     tags: [Troca]
 *     summary: Cria uma nova troca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_livro:
 *                 type: integer
 *                 description: ID do livro que está sendo trocado
 *               id_dono_livro:
 *                 type: integer
 *                 description: ID da pessoa que é dona do livro
 *               id_quem_quer_trocar:
 *                 type: integer
 *                 description: ID da pessoa que deseja trocar o livro
 *               status:
 *                 type: string
 *                 enum: [pendente, confirmada, cancelada]
 *     responses:
 *       201:
 *         description: Troca criada com sucesso
 *       400:
 *         description: Erro ao criar a troca
 */
router.post('/', async (req, res) => {
    try {
        const troca = await Troca.create(req.body);
        res.status(201).json(troca); // Retorna a troca criada
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router; // Exportando as rotas
