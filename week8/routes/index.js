// Got help from https://codingjindo.medium.com/validating-email-password-with-express-validator-96cbe6984bd1
// on how to use the express validator to check register credentials

var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const validateToken = require("../middleware/validateToken");

const {body, validationResult} = require('express-validator')




const mongoDB = "mongodb://127.0.0.1:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
const user = require("../models/Users");
const todo = require("../models/Todo");
db.on("error", console.error.bind(console, "MongoDB connection error"));

db.on("connected", console.error.bind(console, "connect established"));

const passwordCriteria = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/register.html', function(req, res, next) {
  res.render('register', { title: 'Express' });
});
router.get('/login.html', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/api/user/register', body('email').isEmail(), body('password').isStrongPassword(passwordCriteria),function(req,res,next){
  const email = req.body.email;
  
  const password = req.body.password;
  console.log(req.body);
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).send('Invalid credentials');
  }
  const salt = bcrypt.genSaltSync(10);
  const cryptedpassword = bcrypt.hashSync(password, salt);
  user.findOne({email: email})
  .then((data) => {
    if (!data) {
      new user({
          email: email,
          password: cryptedpassword
        }).save()
      return res.send('ok')
    } else {
      return res.status(403).send({email: "Email already in use"});
    }
})});

router.post('/api/user/login', async function(req,res,next){
  const email = req.body.email;
  const password = req.body.password;
  user.findOne({email: email})
  .then((data)=>{
    if(data){
      
      
      bcrypt.compare(password, data.password, function(err,result){
        if(result==true){
          const jwtPayload = {
            id: data._id,
            email: data.email
          };
          const token = jwt.sign(jwtPayload, process.env.SECRET);
          return res.send({success: true, token});
        }else {
        return res.status(403).send("password doesn't match");
      }
      })
        
    }else {
      return res.status(403).send("no user with this email");
    } 
      
  })
  
})
router.get('/api/private', validateToken,function(req,res,next){
  const userEmail = req.user.email;
  console.log(req.user);
  return res.send({email: userEmail})
});

router.get('/api/gettodos', validateToken, async function(req,res,next){
  const existingList = await todo.findOne({user: req.user._id})
  let allItems;
  
  if(existingList== null){
  res.send({nothing: true})
  }
  else {
    allItems = existingList.items
    return res.send({allItems})
  }
})
router.post('/api/todos', validateToken, async function(req,res,next){
  const items = req.body.items;
  const existingList = await todo.findOne({user: req.user._id})
  
  let allItems;
  // console.log(items.length);
  if(existingList!= null){
    if(items[0].length == 0){
      allItems = existingList.items
      return res.send({allItems});
    }
    for(let i = 0; i<items.length;i++){
      existingList.items.push(items[i]);
      existingList.save();
    }
    allItems = existingList.items;
    

  } else {
    allItems = items
    if(items[0].length == 0){
      allItems = []
    }
    
    new todo({
      user: req.user._id,
      items: allItems
    }).save();
  }
  return res.send({allItems});
})

module.exports = router;
