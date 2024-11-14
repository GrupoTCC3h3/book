import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
 
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BookSwap',
      version: '1.0.0',
      description: 'Documentação do BookSwap',
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL do seu servidor
      },
    ],
  },
  apis: ['./routes/pessoa.js'],
};
 
const specs = swaggerJsDoc(options);
export default specs;