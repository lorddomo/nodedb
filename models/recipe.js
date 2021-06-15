let mongoose = require('mongoose');

let recipeSchema = mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
  author:{
    type: String,
    require: true
  },
  body:{
    type: String,
    require: true
  }
});

let Recipe = module.exports = mongoose.model('Recipe', recipeSchema);
