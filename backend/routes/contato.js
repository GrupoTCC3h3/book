import express from 'express';
import Contato from '../model/contato.js'; // Importando o modelo Contato
import { Pessoa } from '../model/pessoa.js';
import { Usuario } from '../model/usuario.js';
import Livro  from '../model/livro.js';
import { Op } from 'sequelize';


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contato
 *   description: Gerenciamento de contatos entre usuários para troca de livros
 */

/**
 * @swagger
 * /contato:
 *   get:
 *     tags: [Contato]
 *     summary: Retorna todos os contatos para troca de livros
 *     responses:
 *       200:
 *         description: Lista de contatos entre os usuários
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
 *                   id_iniciador:
 *                     type: integer
 *                   id_dono_livro:
 *                     type: integer
 *                   criado_em:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Erro ao retornar os contatos
 */
router.get('/', async (req, res) => {
    try {
        const contatos = await Contato.findAll(); // Busca todos os contatos
        res.json(contatos); // Retorna a lista de contatos
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna erro 500
    }
});

router.get('/iniciado', async (req, res) => {
    try {
        const contatos = await Contato.findAll({
            where: {
                id_livro: req.query.idLivro,
                id_iniciador: req.query.idIniciador
            },
            limit: 1
        }); // Busca todos os contatos
        res.json(contatos); // Retorna a lista de contatos
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna erro 500
    }
});

router.get('/destinatario', async (req, res) => {
    const userId = req.query.id_dono_livro;
  
    if (!userId) {
      return res.status(400).json({ error: "ID do usuário logado é obrigatório." });
    }
  
    try {
      const contatos = await Contato.findAll({
        where: {
          [Op.or]: [
            { id_dono_livro: userId },
            { id_iniciador: userId }
          ]
        },
        include: [
          {
            model: Livro,
            as: "Livro",
            attributes: [ "titulo" ],
            required: true
          },
          {
            model: Pessoa,
            as: "Iniciador",
            include: [{ model: Usuario, attributes: ['nome'], required: true }],
            required: true
          },
          {
            model: Pessoa,
            as: "DonoLivro",
            include: [{ model: Usuario, attributes: ['nome'], required: true }],
            required: true
          }
        ]
      });
  
      res.json(contatos);
    } catch (error) {
      console.error("Erro ao buscar contatos:", error);
      res.status(500).json({ error: "Erro interno ao buscar contatos." });
    }
  });
  


/**
 * @swagger
 * /contato:
 *   post:
 *     tags: [Contato]
 *     summary: Cria um novo contato para troca de livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_livro:
 *                 type: integer
 *                 description: ID do livro a ser trocado
 *               id_iniciador:
 *                 type: integer
 *                 description: ID da pessoa que iniciou o contato
 *               id_dono_livro:
 *                 type: integer
 *                 description: ID da pessoa que é dona do livro
 *     responses:
 *       201:
 *         description: Contato criado com sucesso
 *       400:
 *         description: Erro ao criar o contato
 */
router.post('/', async (req, res) => {
    try {        
        const { id_livro, id_iniciador, id_dono_livro } = req.body;
        const contato = await Contato.create({id_dono_livro, id_livro, id_iniciador}); // Cria um novo contato
        res.status(201).json(contato); // Retorna o contato criado
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message }); // Retorna erro 400
    }
});

export default router; // Exporta as rotas
