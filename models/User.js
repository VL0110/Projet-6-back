// Lancer mongoose :

const mongoose = require('mongoose');

// Pré valider information savant enregistrement pour éviter erreurs mongodb 

const uniqueValidator = require('mongoose-unique-validator'); 

// Modèle données utilisateur 

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }
  });
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);

// Cela nous évite d'avoir 2 utilisateurs avec la même adresse email