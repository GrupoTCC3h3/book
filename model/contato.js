const Contato = sequelize.define('Contato', {
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
    id_iniciador: {
        type: DataTypes.BIGINT,  // Altera para BIGINT
        allowNull: false,
        references: {
            model: 'pessoa',  // Referência à tabela pessoa
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
    criado_em: {
        type: DataTypes.DATE,  // Altera para DATE para datetime
        defaultValue: DataTypes.NOW,  // Define valor padrão
    },
}, {
    tableName: "contato",  // Nome da tabela
    timestamps: false,
});

