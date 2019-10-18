const express = require('express'); //importando dependência

const server = express(); //chamando a funcao do express
server.use(express.json()); //forçar express a usar json

// query params = ?teste=1
// route params = /users/1  /users/:id
// request body = { "name": "Julius", "email": "julius@hotmail.com" } 

const users = ['João', 'Pedro', 'André'];

//midleware é um interceptador
server.use((req, res, next) => {
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url}`);
  next();

  console.timeEnd('Request');
});

function checkUserExists(req,res,next){
  if (!req.body.name){
    return res.status(400).json({ error: 'user not found' });
  }
  return next();
}

function checkUserInArray(req,res,next){
  const user = users[req.params.index];
  
  if (!user){
    return res.status(400).json({ error: 'user does not exist' });
  }

  req.user = user;
  return next();
}

server.get('/users', (req, res) =>{
  return res.json(users);
});

server.get('/users/:index', checkUserInArray, (req,res)=>{
  //quando o usuario accessa a rota /teste, faz algo
  return res.send({message: `Hello ${req.user}`});
});

server.post('/users', checkUserExists, (req,res) => {
  const { name } = req.body;  

  users.push(name);

  return res.json(users);
});

server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params; //escolher qual usuáio será alterado
  const { name } = req.body; //qual o novo nome

  users[index] = name;

  return res.send(users);
});

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;
  
  users.splice(index, 1); //delete uma posicao apartir de index
  return res.json(users);
});



server.listen(3000); //deve ouvir porta