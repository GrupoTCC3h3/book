import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

const Livro = sequelize.define('Livro', {
    id: {
        type: DataTypes.BIGINT,  // Altera para BIGINT
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING(255),  // Altera para STRING(255)
        allowNull: true,  // Permite nulo, caso necessário
    },
    estado: {
        type: DataTypes.ENUM('otimo', 'bom', 'regular', 'ruim'),  // Define ENUM
        allowNull: false,
    },
    ano_lancamento: {
        type: DataTypes.INTEGER,  // Altera para INTEGER
        allowNull: true,  // Permite nulo, caso necessário
    },
    autor: {
        type: DataTypes.STRING(200),  // Altera para STRING(200)
        allowNull: true,  // Permite nulo, caso necessário
    },
    id_dono: {
        type: DataTypes.BIGINT,  // Altera para BIGINT
        allowNull: false,
        references: {
            model: 'pessoa',  // Referência à tabela pessoa
            key: 'id',
        },
    },
}, {
    tableName: "livro",  // Nome da tabela
    timestamps: false,
});

// Exportação do modelo
export default Livro; // Default export
