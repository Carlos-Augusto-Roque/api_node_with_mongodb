// Importando o módulo express
const express = require('express');

// Criando um novo roteador do Express
const router = express.Router();

// Importando o modelo de usuário
const User = require('../models/User');

// Importando o módulo mongoose para verificar IDs de objeto
const mongoose = require('mongoose');

// Rota para criar um usuário
// router.post => cria uma rota POST "/cadastrar"
// async (req,res) => define uma função assíncrona que será executada quando uma solicitação POST for feita para a rota
// req => objeto de requisição com os dados enviados pelo client side
// res => objeto de resposta que será devolvido pelo server side

router.post('/cadastrar', async (req, res) => {
  try {
    // Criando um novo usuário com base nos dados do corpo da requisição
    const newUser = new User(req.body);
    // Salvando o novo usuário no banco de dados
    await newUser.save();
    // Respondendo com o novo usuário criado
    res.status(201).json(newUser);
  } catch (error) {
    // Em caso de erro, retornar uma resposta com status 400 e a mensagem de erro
    res.status(400).json({ message: error.message });
  }
});

// Rota para listar todos os usuários
router.get('/listar', async (res) => {
  try {
    // Buscando todos os usuários no banco de dados
    const users = await User.find();
    // Respondendo com a lista de usuários
    res.json(users);
  } catch (error) {
    // Em caso de erro, retornar uma resposta com status 500 e a mensagem de erro
    res.status(500).json({ message: error.message });
  }
});

// Rota para buscar um usuário por ID
router.get('/buscarporid/:id', getUser, (res) => {
  // Respondendo com o usuário encontrado pelo middleware getUser
  res.json(res.user);
});

// Rota para excluir um usuário por ID
router.delete('/deletar/:id', getUser, async (res) => {
  try {
    // Excluindo o usuário encontrado pelo middleware getUser
    await User.findByIdAndDelete(res.user._id);
    // Respondendo com uma mensagem de sucesso
    res.json({ message: 'User deleted' });
  } catch (error) {
    // Em caso de erro, retornar uma resposta com status 500 e a mensagem de erro
    res.status(500).json({ message: error.message });
  }
});

// Middleware para buscar um usuário pelo ID
// Middleware é um intermediário entre a solicitação feita pelo cliente e a resposta enviada pelo servidor
async function getUser(req, res, next) {
  // Obtendo o ID do usuário a partir dos parâmetros da requisição
  const userId = req.params.id;
  // Imprimindo o ID recebido no console (para fins de depuração)
  console.log("ID recebido:", userId); // Adicione este log

  // Verificando se o ID é válido
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  let user;
  try {
    // Buscando o usuário no banco de dados pelo ID
    user = await User.findById(userId);
    // Verificando se o usuário foi encontrado
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    // Em caso de erro, retornar uma resposta com status 500 e a mensagem de erro
    return res.status(500).json({ message: error.message });
  }

  // Passando o usuário encontrado para a próxima função/middleware
  res.user = user;
  // Chama a próxima função
  next();
}

// Exportando o roteador para uso em outros arquivos
module.exports = router;