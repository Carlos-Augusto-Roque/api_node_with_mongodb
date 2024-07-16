// Importando o módulo mongoose
const mongoose = require('mongoose');

// Definindo um novo esquema (schema) de usuário usando o mongoose
const userSchema = new mongoose.Schema({}, { strict: false });

// Adicionando um índice único para o campo de e-mail somente se estiver presente
userSchema.index({ email: 1 }, { unique: true, sparse: true });

// Criando um modelo (model) de usuário com o esquema definido acima
const User = mongoose.model('User', userSchema);

// Exportando o modelo de usuário para uso em outros arquivos
module.exports = User;