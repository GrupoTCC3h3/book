import express from 'express';
import dotenv from 'dotenv';
import pessoas from './routes/pessoa.js';
import contato from './routes/contato.js';
import livro from './routes/livro.js'; // Importando as rotas do livro
import { sequelize } from './db/database.js';
import swaggerUI from 'swagger-ui-express';
import swagger from './swagger/swagger.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Usar PORT do .env, se existir

app.use(express.json());
app.use(cors({
    origin: '*'
}));

// Definindo as rotas
app.use("/pessoa", pessoas);
app.use("/contato", contato);
app.use("/livro", livro); // Usando as rotas de livro
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swagger)); // Swagger já configurado aqui

// Sincronizando com o banco de dados
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((err) => console.error('Erro ao sincronizar o banco de dados:', err));
