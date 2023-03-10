// Lancer models + fs :

const Sauce = require("../models/Sauce");
const fs = require("fs"); 

// Le file system pour accéder aux fonctions pour modifier le système de fichiers et supprimer les fichiers

// CRUD

// Création sauce 

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
      ...sauceObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });
    sauce
      .save()
      .then(() => {
        res.status(201).json({ message: "Sauce enregistré !" });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };


// Afficher sauce 

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
      _id: req.params.id,
    })
      .then((sauce) => {
        res.status(200).json(sauce);
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
        });
      });
  };

// Modifier sauce 

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file
      ? {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }  : { ...req.body };
    delete sauceObject._userId;
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce.userId != req.auth.userId) {
          res.status(401).json({ message: "Not authorized" });
        } else {
          Sauce.updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Sauce modifié!" }))
            .catch((error) => res.status(401).json({ error }));
        }
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };
  

// Supprimer sauce 

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce.userId != req.auth.userId) {
          res.status(401).json({ message: "Not authorized" });
        } else {
          const filename = sauce.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
              .then(() => {
                res.status(200).json({ message: "Sauce supprimé !" });
              })
              .catch((error) => res.status(401).json({ error }));
          });
        }
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  };

// Afficher toutes les sauces 

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
      .then((sauces) => {
        res.status(200).json(sauces);
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  };

// Pour liker et disliker sauces

exports.likedSauce = (req, res, next) => {
  let like = req.body.like
  let userId = req.body.userId
  let sauceId = req.params.id

  switch (like) {
    case 1 :
        Sauce.updateOne({ _id: sauceId }, { $push: { usersLiked: userId }, $inc: { likes: +1 }})
          .then(() => res.status(200).json({ message: `Like` }))
          .catch((error) => res.status(400).json({ error }))
      break;
      
    case 0 :
        Sauce.findOne({ _id: sauceId })
           .then((sauce) => {
            if (sauce.usersLiked.includes(userId)) { 
              Sauce.updateOne({ _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 }})
                .then(() => res.status(200).json({ message: `undefined` }))
                .catch((error) => res.status(400).json({ error }))
            }
            if (sauce.usersDisliked.includes(userId)) { 
              Sauce.updateOne({ _id: sauceId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 }})
                .then(() => res.status(200).json({ message: `undefined` }))
                .catch((error) => res.status(400).json({ error }))
            }
          })
          .catch((error) => res.status(404).json({ error }))
      break;

    case -1 :
        Sauce.updateOne({ _id: sauceId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 }})
          .then(() => { res.status(200).json({ message: `Dislike` }) })
          .catch((error) => res.status(400).json({ error }))
      break;
      default:
        console.log(error);
  }
}