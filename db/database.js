import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
 
dotenv.config();
 
// Configuração do Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
        decimalNumbers: true
    }
  }
);
 
export { sequelize };