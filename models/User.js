// Lancer mongoose :

const mongoose = require('mongoose');

// Pré validé information avant enregistrement pour éviter erreurs mongodb 

const uniqueValidator = require('mongoose-unique-validator'); 

// Modèle de données utilisateur 

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }
  });
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);

// Cela nous évite d'avoir deux utilisateurs avec la même adresse email