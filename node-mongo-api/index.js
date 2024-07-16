// Importando o módulo express
const express = require('express');

// Importando o módulo body-parser
const bodyParser = require('body-parser');

// Importando o módulo mongoose para lidar com o MongoDB
const mongoose = require('mongoose');

// Importando as rotas do usuário definidas em userRoutes.js
const userRoutes = require('./routes/userRoutes');

// Criando uma instância do aplicativo express
const app = express();

// Definindo a porta do servidor, usando a variável de ambiente PORT ou padrão 3000
const PORT = process.env.PORT || 3000;

// URL de conexão com o MongoDB
const MONGODB_URI = 'mongodb+srv://dbCarlosAdmin:db1234@users.4sefwiq.mongodb.net/';

// Conectando-se ao banco de dados MongoDB
mongoose.connect(MONGODB_URI);

// Utilizando o body-parser para interpretar o corpo das requisições como JSON
app.use(bodyParser.json());

// Definindo a rota '/api/users' para usar as rotas definidas em userRoutes
app.use('/api/users', userRoutes);

// Iniciando o servidor na porta definida
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//dbCarlosAdmin
//db1234