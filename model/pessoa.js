import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';
import bcrypt from 'bcrypt';  // Para criptografia de senha

const Pessoa = sequelize.define('Pessoa', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    usuario: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    endereco: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    bairro: {
        type: DataTypes.STRING(150),
        allowNull: true,
    },
    cidade: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
}, {
    tableName: "pessoa",
    timestamps: false,
});

// Hook para criptografar senha antes de criar uma nova pessoa
Pessoa.beforeCreate(async (pessoa) => {
    const salt = await bcrypt.genSalt(10);
    pessoa.senha = await bcrypt.hash(pessoa.senha, salt);
});

export { Pessoa };
