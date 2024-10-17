import express from 'express';
import dotenv from 'dotenv';
import usuario from './routes/usuario.js';
import pessoas from './routes/pessoa.js';
import contato from './routes/contato.js';
import livro from './routes/livro.js'; 
import Troca from './routes/troca.js';
import mensagem from './routes/mensagem.js';
import { sequelize } from './db/database.js'; // Usando a instância de sequelize do arquivo de banco de dados
import swaggerUI from 'swagger-ui-express';
import swagger from './swagger/swagger.js';
import cors from 'cors';

// Carregar as variáveis do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Usar PORT do .env, se existir

app.use(express.json());
app.use(cors({
    origin: '*'
}));

// Testar a conexão com o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados foi bem-sucedida!');
    })
    .catch((error) => {
        console.error('Não foi possível conectar ao banco de dados:', error);
    });

// Definindo as rotas
app.use("/usuario", usuario); 
app.use("/pessoa", pessoas);
app.use("/contato", contato);
app.use("/livro", livro);
app.use("/troca", Troca); 
app.use("/mensagem", mensagem);
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swagger)); // Swagger já configurado aqui

// Sincronizando com o banco de dados
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((err) => console.error('Erro ao sincronizar o banco de dados:', err));