const express = require('express');

const router = express.Router();

const CheckList = require('../models/checkList');

router.get('/', async (req, res) => {
	try{
    let checkList = await CheckList.find({})
    res.status(200).render('checklists/index', {checklist: checkList})
  }catch(err){
    res.status(500).render('checklists/index', {error: "Erro ao exibir as listas"})
  }
})

router.get('/new', async (req, res) =>{
  try {
    let checklist = new CheckList();
    res.status(200).render('checklists/new', { checklist: checklist})
  }catch(err){
    res.status(500).render('pages/error', {error: "Erro ao carregar o formulário"})
  }
} )
router.get('/:id', async (req, res) => {
  try{
    let checkList = await CheckList.findById(req.params.id)
    res.status(200).render('checklists/show', {checklist: checkList})
  }catch(err){
    res.status(500).render('checklists/show', {error: "Erro ao exibir as listas"})
  }
})

router.post('/', async (req, res) => {
	let { name } = req.body.checklist;
  let checkList = new CheckList({name})
  try{
    await checkList.save();
    res.redirect('/checklist');
  }catch(err){
    res.status(422).render('/checklists/new', {checklists: { ...checkList, error }})
  }
  
})

router.get('/:id/edit', async (req, res) => {
  try {
    let checklist = await CheckList.findById(req.params.id);
    res.status(200).render('checklists/edit', {checklist: checklist})
  }catch(err){
    res.status(500).render('pages/error', {error: "Error ao editar lista"})
  }
})

router.put('/:id', async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = await CheckList.findById(req.params.id);
  try {
    await checklist.updateOne({name: name});
    res.redirect('/checklist');
  }catch(err){
    let errors = err.errors;
    res.status(422).render('checklist/edit', {checklist: {...checklist, errors}})
  }
})
router.delete('/:id', async (req, res) => {
	try{
    let checklist = await CheckList.findByIdAndRemove(
    req.params.id);
    res.redirect('/checklist');
  }catch(err){
    res.status(500).render('pages/error', {error: "Error ao deletar"})
  }
})


module.exports = router;