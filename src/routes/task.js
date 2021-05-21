const express = require('express');

const checklistDepedentRoute = express.Router();

const CheckList = require('../models/checkList');

const TaskSchema = require('../models/task')


checklistDepedentRoute.get('/:id/tasks/new', async(req, res) => {
  try{
    let task = TaskSchema();
    res.status(200).render('tasks/new', {checklistId: req.params.id, task: task});
  }catch(error){
    res.status(422).render('pages/error', {error: 'Erro ao carregar o formulário'})
  }
})

checklistDepedentRoute.post('/:id/tasks/new', async (req, res) => {
  let { name } = req.body.task;
  let task = new TaskSchema({ name, checkList: req.params.id})
  try {
    await task.save();
    let checklist = await CheckList.findById(req.params.id)
    await checklist.tasks.push(task);
    await checklist.save();
    res.redirect(`/checklist/${req.params.id}`)
  }catch (error){
    let erros = error.errors;
    res.status(422).render('tasks/new', { task: { ...task, erros}, checklistId: req.params.id})
  }
})

checklistDepedentRoute.delete('/:id/tasks/new', async (req, res) => {
  let { name } = req.body.task;
  let task = new TaskSchema({ name, checkList: req.params.id})
  try {
    await task.save();
    let checklist = await CheckList.findById(req.params.id)
    await checklist.tasks.push(task);
    await checklist.save();
    res.redirect(`/checklist/${req.params.id}`)
  }catch (error){
    let erros = error.errors;
    res.status(422).render('tasks/new', { task: { ...task, erros}, checklistId: req.params.id})
  }
})

module.exports = { checklistDepedent: checklistDepedentRoute};
