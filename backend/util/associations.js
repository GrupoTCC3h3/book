import Livro from '../model/livro.js'; 
import {Pessoa} from '../model/pessoa.js'; 
import {Usuario} from '../model/usuario.js';


// Associação entre Usuario e Pessoa (um-para-um)
Usuario.hasOne(Pessoa, { foreignKey: 'id_usuario' });
Pessoa.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Associação entre Pessoa e Livro (um-para-muitos)
Pessoa.hasMany(Livro, { foreignKey: 'id_pessoa' });
Livro.belongsTo(Pessoa, { foreignKey: 'id_pessoa' });

export { Usuario, Pessoa, Livro };