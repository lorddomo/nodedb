const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function(req, res){
  let recipes = [
    {
      id:1,
      title:'Recipe one',
      author:'Dominik Choroś',
      body:'This is recipe one'
    },
    {
      id:2,
      title:'Recipe two',
      author:'Dominik Choroś',
      body:'This is recipe two'
    },
    {
      id:3,
      title:'Recipe three',
      author:'Dominik Choroś',
      body:'This is recipe three'
    }
  ];
  res.render('index', {
    title:'Recipes',
    recipes: recipes
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
