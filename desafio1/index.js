const express = require('express');

const server = express();

server.use(express.json());

// const project = {
//   id,
//   title,
//   tasks = []
// }

function checkProjectExists(req,res,next){
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
  if (!project){
    return res.status(400).json({ error: 'project not found' });
  }
  return next();
}

let i = 0;
function countReq(req,res,next){
  i = i+1;
  console.log(i);
  return next();
}

const projects = [];

server.post('/projects',countReq, (req,res) => {
  const { id } = req.body;
  const { title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  }
  projects.push(project);
  return res.json(projects);
})

server.post('/projects/:id/tasks',countReq, checkProjectExists, (req,res) =>{
  const { id } = req.params;
  const { task } = req.body;
  const project = projects.find(p => p.id == id);
  project.tasks.push(task);

  return res.json(projects);
  
})

server.put('/projects/:id', countReq, checkProjectExists, (req,res) =>{
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);
  project.title = title;

  return res.json(projects);
})

server.delete('/projects/:id',countReq,checkProjectExists, (req,res) =>{
  const { id } = req.params;
  const projectindex = projects.findIndex(p => p.id == id);
  projects.splice(projectindex, 1); //delete uma posicao apartir de index
  return res.json(projects);
})

server.get('/projects', countReq,(req, res) => {
  return res.json(projects);
})

server.listen(3000);