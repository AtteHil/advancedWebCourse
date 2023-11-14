var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My todos' });
});

let list = []

router.post('/todo', function(req, res, next) {
  const name = req.body.name;
  const task = req.body.todos
  
  let index =-1
  index = list.findIndex(list => list.name === name )
  if (index == -1){
    list.push({"name":name, "todos":[task]})
    res.send({"status": "User added"})
  }
  else if(index!=-1){
    list[index].todos.push(task);
    res.send({"status": "Todo added"})
  }
  // console.log(list);
  
});
router.get('/user/:id', function(req, res, next) {
  const name = req.params.id;
  const index = list.findIndex(list => list.name === name )
  console.log(name, index);
  if (index !== -1){
    res.send({dude:list[index]})
  }
  else {
    res.send({"status": "User not found"})
  }
});


router.delete('/user/:id', function(req, res, next) {
  const name = req.params.id;
  const index = list.findIndex(list => list.name === name )
  
  if (index !== -1){
    list.splice(index,1);
    console.log(list);
    res.send({"status": "User Deleted"})
  }
  else {
    res.send({"status": "User not found"})
  }
});
router.put('/user', function(req, res, next) {
  const name =req.body.name
  const task = req.body.task
  // console.log("tuli ", name, task);
  const index = list.findIndex(list => list.name === name )
  if (index!=-1){
    const array = list[index].todos
    const taskIndex = array.indexOf(task);
    list[index].todos.splice(taskIndex,1);
    console.log(list[index])
    res.send({"status": "Task deleted"})
  }
  else{
    res.send({"status": "User not found"});
  }
  
  
});
module.exports = router;
