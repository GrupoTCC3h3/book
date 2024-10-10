import express from 'express';
import dotenv from 'dotenv';
import pessoas from './routes/pessoa.js';
// import horarios from './routes/livro.js'
import { sequelize } from './db/database.js';
import swaggerUI from 'swagger-ui-express';
import swagger from './swagger/swagger.js';
import cors from 'cors';
 
dotenv.config();
 
const app = express();
const PORT = 3000;
 
app.use(express.json());
app.use(cors({
    origin: '*'
}));
 
 
app.use("/pessoa", pessoas);
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swagger));
// Configuração do Swagger
setupSwagger(app); // Certifique-se de que isso está presente
// app.use("/livros", livros);
// app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swagger));
 
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => console.error('Erro ao sincronizar o banco de dados:', err))