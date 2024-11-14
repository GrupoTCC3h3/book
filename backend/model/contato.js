import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

// Definição do modelo Contato
const Contato = sequelize.define('Contato', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    id_livro: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    id_iniciador: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    id_dono_livro: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    criado_em: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "contato", // Nome da tabela no banco de dados
    timestamps: false, // Não usar timestamps automáticos
});

// Exportando o modelo Contato como exportação padrão
export default Contato;
