import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js"; // Caminho para o banco de dados
import { Pessoa } from './pessoa.js'; // Importando corretamente

const Livro = sequelize.define('livro', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('otimo', 'bom', 'regular', 'ruim'),
        allowNull: false
    },
    ano_lancamento: {
        type: DataTypes.INTEGER
    },
    autor: {
        type: DataTypes.STRING
    },
    capa: {
        type: DataTypes.STRING
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_pessoa: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'livro',
});

export default Livro;
