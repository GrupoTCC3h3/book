import Livro from '../model/livro.js'; 
import {Pessoa} from '../model/pessoa.js'; 
import {Usuario} from '../model/usuario.js';
import Contato from '../model/contato.js';

Contato.belongsTo(Pessoa, { as: "Iniciador", foreignKey: "id_iniciador" });
Contato.belongsTo(Pessoa, { as: "DonoLivro", foreignKey: "id_dono_livro" });

// Associação entre Usuario e Pessoa (um-para-um)
Usuario.hasOne(Pessoa, { foreignKey: 'id_usuario' });
Pessoa.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Associação entre Pessoa e Livro (um-para-muitos)
Pessoa.hasMany(Livro, { foreignKey: 'id_pessoa' });
Livro.belongsTo(Pessoa, { foreignKey: 'id_pessoa' });
Livro.hasMany(Contato, { foreignKey: 'id_livro', onDelete: 'CASCADE' });

export { Usuario, Pessoa, Livro };