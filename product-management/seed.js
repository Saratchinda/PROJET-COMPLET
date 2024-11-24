 // Importation de mongoose pour interagir avec la base de données MongoDB
 const mongoose = require('mongoose');

 // Importation du modèle Product pour pouvoir insérer des produits dans la base de données
 const Product = require('./models/Product');
 
 // Chargement des variables d'environnement depuis le fichier .env
 require('dotenv').config();
 
 // Tableau de produits à insérer dans la base de données
 const products = [
     {
         name: 'AC1 Phone1',
         type: 'phone',
         price: 200.05,
         rating: 3.8,
         warranty_years: 1,
         available: true
     },
     {
         name: 'AC2 Phone2',
         type: 'phone',
         price: 147.21,
         rating: 1,
         warranty_years: 3,
         available: false
     },
     {
         name: 'AC3 Phone3',
         type: 'phone',
         price: 150,
         rating: 2,
         warranty_years: 1,
         available: true
     },
     {
         name: 'AC4 Phone4',
         type: 'phone',
         price: 50.20,
         rating: 3,
         warranty_years: 2,
         available: true
     }
 ];
 
 // Connexion à MongoDB avec les informations de connexion de l'environnement
 mongoose
     .connect(process.env.MONGO_URI, {
         useNewUrlParser: true,  // Utilisation de l'analyseur d'URL moderne
         useUnifiedTopology: true  // Utilisation du gestionnaire de topologie unifié
     })
     .then(async () => {
         // Suppression de tous les produits existants dans la base de données
         await Product.deleteMany();
         
         // Insertion des nouveaux produits dans la base de données
         await Product.insertMany(products);
         
         // Message de succès après l'insertion des produits
         console.log('Produits ajoutés avec succès !');
         
         // Déconnexion de la base de données après avoir inséré les produits
         mongoose.disconnect();
     })
     .catch(err => {
         // Gestion des erreurs de connexion ou d'insertion
         console.error('Erreur lors de la connexion à MongoDB:', err);
         
         // Déconnexion de la base de données en cas d'erreur
         mongoose.disconnect();
     });