import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

const Livro = sequelize.define('Livro', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    estado: {
        type: DataTypes.ENUM('otimo', 'bom', 'regular', 'ruim'),
        allowNull: false,
    },
    ano_lancamento: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    autor: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    id_dono: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'pessoa',
            key: 'id',
        },
    },
}, {
    tableName: "livro",
    timestamps: false,
});

export default Livro; // Exportação padrão
