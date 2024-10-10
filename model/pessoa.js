import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
 
const Pessoa = sequelize.define('Pessoa', {
    id: {
        type: DataTypes.BIGINT,  // Altera para BIGINT
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(200),  // Altera para STRING(200)
        allowNull: false,
    },
    usuario: {
        type: DataTypes.STRING(200),  // Adiciona o campo usuario
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING(200),  // Adiciona o campo senha
        allowNull: false,
    },
    data_nascimento: {
        type: DataTypes.DATE,  // Adiciona o campo data_nascimento
        allowNull: true,
    },
    endereco: {
        type: DataTypes.STRING(255),
        allowNull: true,  // Altera para allowNull true para se adequar ao modelo original
    },
    bairro: {
        type: DataTypes.STRING(150),
        allowNull: true,  // Altera para allowNull true
    },
    cidade: {
        type: DataTypes.STRING(200),  // Adiciona o campo cidade
        allowNull: true,  // Altera para allowNull true
    },
}, {
    tableName: "pessoa",  // Altera o nome da tabela para "pessoa"
    timestamps: false,
});

 
export { Pessoa };