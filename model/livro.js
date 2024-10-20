import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

const Livro = sequelize.define('livro', {
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
        type: DataTypes.STRING // Mantendo apenas um campo para a capa
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'livro', // Agora esta linha está no lugar correto
    timestamps: false
});

export default Livro;
