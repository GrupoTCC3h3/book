import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

const Mensagem = sequelize.define('Mensagem', {
    id: {
        type: DataTypes.BIGINT,  // Altera para BIGINT
        autoIncrement: true,
        primaryKey: true,
    },
    id_contato: {
        type: DataTypes.BIGINT,  // Altera para BIGINT
        allowNull: false,
        references: {
            model: 'contato',  // Referência à tabela contato
            key: 'id',
        },
    },
    id_remetente: {
        type: DataTypes.BIGINT,  // Altera para BIGINT
        allowNull: false,
        references: {
            model: 'pessoa',  // Referência à tabela pessoa
            key: 'id',
        },
    },
    id_destinatario: {
        type: DataTypes.BIGINT,  // Altera para BIGINT
        allowNull: false,
        references: {
            model: 'pessoa',  // Referência à tabela pessoa
            key: 'id',
        },
    },
    criado_em: {
        type: DataTypes.DATE,  // Altera para DATE para datetime
        defaultValue: DataTypes.NOW,  // Define valor padrão
    },
    mensagem: {
        type: DataTypes.TEXT,  // Altera para TEXT
        allowNull: false,
    },
}, {
    tableName: "mensagem",  // Nome da tabela
    timestamps: false,
});

// Exportação do modelo
export default Mensagem; // Default export

