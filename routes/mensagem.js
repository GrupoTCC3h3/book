import express from 'express';
import Mensagem from '../model/mensagem.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mensagem
 *   description: Gerenciamento de mensagens entre usuários
 */

/**
 * @swagger
 * /mensagem:
 *   get:
 *     tags: [Mensagem]
 *     summary: Retorna todas as mensagens
 *     responses:
 *       200:
 *         description: Lista de mensagens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   id_contato:
 *                     type: integer
 *                   id_remetente:
 *                     type: integer
 *                   id_destinatario:
 *                     type: integer
 *                   criado_em:
 *                     type: string
 *                     format: date-time
 *                   mensagem:
 *                     type: string
 *       500:
 *         description: Erro ao retornar as mensagens
 */
router.get('/', async (req, res) => {
    try {
        const mensagens = await Mensagem.findAll();
        res.json(mensagens);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /mensagem:
 *   post:
 *     tags: [Mensagem]
 *     summary: Cria uma nova mensagem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_contato:
 *                 type: integer
 *                 description: ID do contato relacionado à mensagem
 *               id_remetente:
 *                 type: integer
 *                 description: ID da pessoa que enviou a mensagem
 *               id_destinatario:
 *                 type: integer
 *                 description: ID da pessoa que recebeu a mensagem
 *               mensagem:
 *                 type: string
 *                 description: O conteúdo da mensagem
 *     responses:
 *       201:
 *         description: Mensagem criada com sucesso
 *       400:
 *         description: Erro ao criar a mensagem
 */
router.post('/', async (req, res) => {
    try {
        const mensagem = await Mensagem.create(req.body);
        res.status(201).json(mensagem); // Retorna a mensagem criada
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router; // Exportando as rotas
