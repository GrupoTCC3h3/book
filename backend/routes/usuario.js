import express from 'express';
import { Usuario } from '../model/usuario.js';
import bcrypt from 'bcrypt'; // Usar para criptografar/verificar senhas
import { Pessoa } from '../model/pessoa.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: usuarios
 *   description: Gerenciamento de usuarios no site
 */

// Rota para obter todos os usuários
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para criar um novo usuário
router.post('/', async (req, res) => {
    try {
        // Verifique se o corpo da requisição está recebendo os dados corretamente
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
        }

        // Criptografar a senha antes de salvar no banco
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        // Criar usuário com a senha criptografada
        const usuario = await Usuario.create({
            nome: nome,
            email: email,
            senha: hashedPassword
        });

        await Pessoa.create({
            id_usuario: usuario.id
        });

        res.status(201).json(usuario);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(400).json({ error: error.message });
    }
});


router.post('/login', async (req, res) => {
    const { email, senha } = req.body; // Recebe email e senha do frontend

    try {
        // Busca o usuário no banco de dados usando o email
        const usuarioDB = await Usuario.findOne({ where: { email } });

        // Se o usuário não for encontrado
        if (!usuarioDB) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Compara a senha enviada com a senha criptografada no banco
        const senhaValida = await bcrypt.compare(senha, usuarioDB.senha);

        // Se a senha estiver incorreta
        if (!senhaValida) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        // Login bem-sucedido, retorna os dados do usuário
        res.status(200).json({
            id: usuarioDB.id,
            nome: usuarioDB.nome,
            email: usuarioDB.email,
        });
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).json({ message: 'Erro no servidor', error });
    }
});

export default router;