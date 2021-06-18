const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/recipes');
let db = mongoose.connection;

db.once('open', function(){
  console.log('Connected to MongoDB');
});

db.on('error', function(err){
  console.log(err);
});

const app = express();

let Recipe = require('./models/recipe');

app.use(bodyParser.urlencoded({ extened: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function(req, res){
  Recipe.find({}, function(err, recipes){
    if(err){
      console.log(err);
    } else{
      res.render('index', {
        title:'Recipes',
        recipes: recipes
      });
    }
  });
});

app.get('/recipe/:id', function(req, res) {
  Recipe.findById(req.params.id, function(err, recipe){
    res.render('recipe',{
      recipe: recipe
    });
  });
})

app.get('/recipe/edit/:id', function(req, res) {
  Recipe.findById(req.params.id, function(err, recipe){
    res.render('edit_recipe',{
      title:'Edit Recipe',
      recipe: recipe
    });
  });
})

app.get('/recipes/add', function(req, res){
  res.render('add_recipe',{
    title:'Add Recipe'
  });
});

app.post('/recipes/add', function(req, res){
  let recipe = new Recipe();
  recipe.title = req.body.title;
  recipe.author = req.body.author;
  recipe.body = req.body.body;

  recipe.save(function(err){
    if(err){
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
  });

app.listen(3000, function(){
  console.log('Server started on port 3000');
});
