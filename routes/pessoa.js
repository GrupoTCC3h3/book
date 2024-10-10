import express from 'express';
import { Pessoa } from '../model/pessoa.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pessoas
 *   description: Gerenciamento de pessoas
 */

/**
 * @swagger
 * /pessoa:
 *   get:
 *     tags: [Pessoas]
 *     summary: Retorna a lista de pessoas
 *     responses:
 *       200:
 *         description: Lista de pessoas
 *       500:
 *         description: Erro ao buscar pessoas
 */
router.get('/', async (req, res) => {
    try {
        const pessoas = await Pessoa.findAll();
        res.json(pessoas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /pessoa:
 *   post:
 *     tags: [Pessoas]
 *     summary: Cria uma nova pessoa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               usuario:
 *                 type: string
 *               senha:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *               endereco:
 *                 type: string
 *               bairro:
 *                 type: string
 *               cidade:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pessoa criada com sucesso
 *       400:
 *         description: Erro ao criar pessoa
 */
router.post('/', async (req, res) => {
    try {
        const pessoa = await Pessoa.create(req.body);
        res.status(201).json(pessoa);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
