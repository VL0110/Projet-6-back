# Projet-6-back

Projet 6 construisez une API sécurisée 

P6 - HotTakes

[ npm install front back npm start nodemon .env et moongose dossier images ]

Bienvenue dans ce projet qui vise à permettre aux utilisateurs d'ajouter leurs sauces préférées ainsi qu'à pouvoir « liker » et « disliker » les sauces ajoutées par d'autres utilisateurs.

Étapes utilisateur :

1°) Récupérez les données backend ("Projet-6-back") puis récupérez les données frontend du projet et placez-les dans un dossier "front" à côté du dossier "Project-6-back" récupérez et suivez les étapes ci-dessous :

    a)	Cloner le dépôt git du projet 

    b)	Ouvrez le terminal du dossier frontend et lancez la commande : npm install et ensuite npm run start

    c)	Ouvrez le terminal du dossier « Projet-6-back » (backend) et lancer la commande : npm install et ensuite npm run start

2°) Pour ce projet, l'utilisation du site mongodb atlas est nécessaire, vous devrez donc vous enregistrer. Ensuite, créez un cluster utilisateur spécifique conformément aux instructions.

3°) Une fois que le cluster sera créé, rendez-vous sur « connect », puis  sur « connect your application » et copier le lien « mongo+srv… ».

4°) Créez un fichier « .env » et insérez le lien mongodb récupéré précédemment comme suit :
« DB_CONNEXION ='mongodb+srv://vl0110:motdepasse@cluster28.o2e0bh6.mongodb.net/?retryWrites=true&w=majority'
PORT = 3000 ».
Dans mon cas voici le lien récupéré, il s’agira donc de récupérer votre propre lien et de remplacer le « motdepasse » par votre mot de passe.

5°) Une fois les étapes suivies, vous pourrez mettre en route le front sur le terminal avec « ng serve » et le back avec « node server ».

6°) Rendez-vous ensuite sur : localhost :4200

Le site est à présent fonctionnel, inscrivez-vous et vous pourrez ajouter et modifier vos sauces ainsi que liker ou disliker celle des autres.

Valentin Lintignac.
