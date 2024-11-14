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


router.put("/:id", async (req, res) => {
    try {
        // Criar pessoa com a senha criptografada
        const pessoa = await Pessoa.update(
            {
                endereco: req.body.endereco,
                data_nascimento: req.body.data_nascimento,
                bairro: req.body.bairro,
                cidade: req.body.cidade
            }, 
            {
                where: {
                    id: req.params.id
                }
            }
        );

        res.status(200).json(pessoa);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const pessoa = await Pessoa.findOne({
            where: {
                id_usuario: req.params.id
            }
        });
        res.json(pessoa);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
