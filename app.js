// Extensions nécessaires  :

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const sauceRoutes = require ('./routes/sauces')
const path = require('path');
const dotenv = require('dotenv/config');
console.log(dotenv.parsed)
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_CONNEXION, 
  { useNewUrlParser: true,
    useUnifiedTopology: true }
    )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
const app = express();
app.use(express.json());

// Ajout header :

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  app.use('/api/auth', userRoutes);
  app.use('/api/sauces', sauceRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));
  
  module.exports = app;
