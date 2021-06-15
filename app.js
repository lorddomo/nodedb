const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

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

app.get('/recipes/add', function(req, res){
  res.render('add_recipe', {
      title:'Add Recipe'
    });
});

app.listen(3000, function(){
  console.log('Server started on port 3000');
});
