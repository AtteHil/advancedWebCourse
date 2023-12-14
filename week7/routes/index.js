
var express = require('express');
const app = express();
var bodyParser = require('body-parser');
const session = require("express-session");
var router = express.Router();
var functions = require('../functions/functions.js');
let userArray = []
let userId = 1500;
let userTodos = []
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.use(session({
  secret: 'MyOwnVerySecretKey123', 
  resave: false,
  saveUninitialized: true,
  
}));
// Found help for storing the cookie here https://expressjs.com/en/resources/middleware/cookie-session.html and here https://groups.google.com/g/express-js/c/de9sf9Ly_rY?pli=1

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/api/user/list', function(req, res, next) {
  res.send(userArray);
});

router.post("/api/user/register", function(req, res, next){
  if(req.session.user){ // checking if user is logfged in and his cokie is stored in session.
    return res.redirect("/");
  }
  console.log(req.body);
  const userName = req.body.username;
  
  const hashedPassword = functions.hashFunction(req.body.password)
  const user = {
    id: userId,
    username: userName,
    password: hashedPassword
  }
  
  
  if(!userArray.find(user => user.username === userName)){
    userArray.push(user);
    userId+=1;
    return res.send(user)
  }else return res.status(400).send()
    
  
})

router.get('/api/secret', function(req, res, next) {
  if(req.session.user){
    return res.status(200).send();
  }
  else return res.status(401).send()
});


router.post("/api/user/login", async (req, res, next)=> {
  if(req.session.user){
    return res.redirect("/");
  }
  // console.log(req.body)
  const { username, password } = req.body;
  // console.log(userArray)
  
  
  const user = await userArray.find(user => user.username === username);
  
  if(await functions.comparePasswords(password, user.password)){
    req.session.user = user;
    res.status(200).send()
  } else return res.status(401).send()

})
router.post("/api/todos", (req, res , next) => {
  const todos = req.body.todo
  
  if (req.session.user){
    const sessionUser = req.session.user;
    let user = userTodos.find(user => user.id === sessionUser.id);
    if(!user){
      user = {id: sessionUser.id, todos: []}
      userTodos.push(user);
      
    }
    // for( let i = 0; i<todos.length; i++){
    user.todos.push(todos);
    // }
    
    return res.status(200).send(user)
  } else return res.sendStatus(401);
})
router.get("/api/todos/list", (req, res, next) =>{
  res.send(userTodos);
})
module.exports = router;
