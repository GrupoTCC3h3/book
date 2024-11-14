import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

const Troca = sequelize.define('Troca', {
    id: {
        type: DataTypes.BIGINT,  // Altera para BIGINT
        autoIncrement: true,
        primaryKey: true,
    },
    id_livro: {
        type: DataTypes.BIGINT,  // Altera para BIGINT
        allowNull: false,
        references: {
            model: 'livro',  // Referência à tabela livro
            key: 'id',
        },
    },
    id_dono_livro: {
        type: DataTypes.BIGINT,  // Altera para BIGINT
        allowNull: false,
        references: {
            model: 'pessoa',  // Referência à tabela pessoa
            key: 'id',
        },
    },
    id_quem_quer_trocar: {
        type: DataTypes.BIGINT,  // Altera para BIGINT
        allowNull: false,
        references: {
            model: 'pessoa',  // Referência à tabela pessoa
            key: 'id',
        },
    },
    created_at: {
        type: DataTypes.DATE,  // Altera para DATE para datetime
        defaultValue: DataTypes.NOW,  // Define valor padrão
    },
    updated_at: {
        type: DataTypes.DATE,  // Altera para DATE para datetime
        allowNull: true,  // Permite nulo, caso necessário
    },
    status: {
        type: DataTypes.ENUM('pendente', 'confirmada', 'cancelada'),  // Define ENUM
        allowNull: true,  // Permite nulo, caso necessário
    },
}, {
    tableName: "troca",  // Nome da tabela
    timestamps: false,
});

// Exportação do modelo
export default Troca; // Default export

