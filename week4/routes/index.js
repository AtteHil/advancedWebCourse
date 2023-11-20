var express = require('express');
var router = express.Router();
const recipes = []
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// get recipe for the certain food
router.get('/recipe/:food', function(req, res, next) {
  const food = req.params.food
  const jsonRecipe = makeRecipe(food);
  
  res.send(jsonRecipe);
});

// post to update wiht own recipe
router.post('/recipe/', function(req, res, next) {
  recipes.push(req.body);
  res.send(req.body)

});
router.post('/images', function(req, res, next) {
  res.send({"status":"Hi"});
  
});

const makeRecipe = (name) =>{
  const instructions = ['Proof the yeast', 'Make and knead the pizza dough', 'let the dough rise'];
  const ingredients = ['355 ml water', '1 package dry yeast', '490g bread flour', '2 tablespoons olive oil', '2 teaspoons salt', '1 tespoon sugar'];
  return {'name': name, 'ingredients': ingredients,'instructions': instructions}

}


module.exports = router;


