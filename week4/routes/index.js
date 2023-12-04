var express = require('express');
const mongoose = require("mongoose");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
var router = express.Router();
const recipe = require("../models/Recipes");
const category = require("../models/Categories");
const importedImage = require("../models/Images");


const mongoDB = "mongodb://127.0.0.1:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));

db.on("connected", console.error.bind(console, "connect established"));
let imageId = []
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// get recipe for the certain food
router.get('/recipe/:food', function(req, res, next) {
  const food = req.params.food
  recipe.find( {name: new RegExp(food, "i")})
  
  .then((data)=>{
    if(data.length > 0) {
      
        return res.send(data);
    } else {
        return res.status(404).send("There is no food including " + food);
    }
})
});



router.get('/categories', function(req,  res, next){
  
  category.find({}) 
  .then((data)=>{
    if(data){
    console.log(data)
    res.send(data)
  }
  })
    
});


// found help to this from this stackoverflow https://stackoverflow.com/questions/70076193/how-to-convert-mongodb-buffer-to-image-in-react-node-express
//although it is made with react I used line 65 and 66 from it.
router.get('/images/:imageid', function(req,res,next){
  const imgId = req.params.imageid;
  importedImage.findById(imgId)
  .then((image) =>{
    if(image){
      res.setHeader('Content-type', `${image.mimetype}`);
      res.setHeader('Content-Disposition', 'inline');
      // console.log(image);
      const base64String = Buffer.from(image.buffer).toString('base64');
      const dataUrl = `data:${image.mimetype};base64, ${base64String}`;

      res.send({imageUrl: dataUrl});
    }
  })
})


// post to update wiht own recipe
router.post('/recipe/', function(req, res, next) {
  
  recipe.findOne({name: req.body.name})
  .then((data) => {
    if (!data) {
      new recipe({
          name: req.body.name,
          ingredients: req.body.ingredients,
          instructions: req.body.instructions,
          categories: req.body.categories,
          images: req.body.images
        }).save()
      
    }

    if (data) {
      imageId=[];
      console.log(data);
    }
  })
  .catch((err) => console.log(err));
  res.send(req.body);
})



  
  
    
    
  


router.post('/images',upload.array('images') ,function(req, res, next) {
  let images = []
  req.files.forEach(file => {
    const image = new importedImage({
      buffer: file.buffer,
      encoding: file.encoding,
      mimetype: file.mimetype,
      name: file.originalname
    })
    images.push(image)
    imageId.push(image._id);
  })
  importedImage.insertMany(images);
  
  
  res.send({"id": images[0]._id});
  
});




module.exports = router;


