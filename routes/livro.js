import express from 'express';
import { Livro } from '../model/troca.js';
 
const router = express.Router();
 
router.get('/', async (req, res) => {
    try {
        const pessoas = await Pessoa.findAll();
        res.json(pessoas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
 
router.post('/', async (req, res) => {
    try {
        const pessoa = await Pessoa.create(req.body);
        res.status(201).json(pessoa);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
 
export default router;