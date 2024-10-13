import express from 'express';
import { Pessoa } from '../model/pessoa.js';
import bcrypt from 'bcrypt';  // Usar para criptografar/verificar senhas

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
        // Criptografar a senha antes de salvar no banco
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.senha, salt);

        // Criar pessoa com a senha criptografada
        const pessoa = await Pessoa.create({
            ...req.body,
            senha: hashedPassword
        });

        res.status(201).json(pessoa);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /pessoa/login:
 *   post:
 *     tags: [Pessoas]
 *     summary: Faz login de uma pessoa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Senha incorreta
 *       404:
 *         description: Usuário não encontrado
 */
router.post('/login', async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        // Busca o usuário no banco de dados
        const pessoa = await Pessoa.findOne({ where: { usuario } });

        // Se o usuário não for encontrado
        if (!pessoa) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Compara a senha enviada com a senha criptografada no banco
        const senhaValida = await bcrypt.compare(senha, pessoa.senha);

        if (!senhaValida) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        // Login bem-sucedido, retorna os dados do usuário
        res.status(200).json({
            id: pessoa.id,
            nome: pessoa.nome,
            usuario: pessoa.usuario,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
});

export default router;
