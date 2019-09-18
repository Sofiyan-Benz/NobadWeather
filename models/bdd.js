// Do not forget to store your new request module in a variable in order to use it
const mongoose = require('mongoose');

var user = "capsule";
var password = "azerty1";
var port = 24778;
var bddname = "weatherapp";


// useNewUrlParser ;)
var options = {
   connectTimeoutMS: 5000,
   useNewUrlParser: true,
  };

  mongoose.connect('mongodb+srv://codethique:game0fthecode@soflabs-bjat1.mongodb.net/weatherapp?retryWrites=true&w=majority',
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('connexion ok');
    }
   }
)

module.exports = mongoose;
