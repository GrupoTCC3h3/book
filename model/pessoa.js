import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';


const Pessoa = sequelize.define('Pessoa', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
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
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "pessoa",
    timestamps: false,
});

export { Pessoa };
