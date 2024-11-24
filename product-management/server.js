// Importation des dépendances nécessaires
const express = require('express');           // Framework Express pour créer le serveur web
const http = require('http');                // Pour créer un serveur HTTP
const mongoose = require('mongoose');        // Pour interagir avec MongoDB
const bodyParser = require('body-parser');   // Middleware pour parser les requêtes JSON
const cors = require('cors');                // Middleware pour gérer les requêtes cross-origin
const socketIo = require('socket.io');       // Pour activer la communication en temps réel via WebSocket
require('dotenv').config();                  // Pour charger les variables d'environnement depuis le fichier .env

// Création de l'application Express et du serveur HTTP
const app = express();
const server = http.createServer(app);

// Initialisation de Socket.IO pour gérer la communication en temps réel
const io = socketIo(server);

// Définition du port à utiliser (soit celui dans les variables d'environnement, soit 5000 par défaut)
const PORT = process.env.PORT || 5000;

// Configuration des middlewares
app.use(bodyParser.json());   // Permet de parser le corps des requêtes en JSON
app.use(cors({               // Autorise les requêtes venant de localhost:3000 (frontend)
    origin: 'http://localhost:3000', 
}));

// Connexion à la base de données MongoDB
mongoose
    .connect(process.env.MONGO_URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(() => {
        console.log('MongoDB connecté avec succès');
    })
    .catch((err) => {
        console.error('Erreur de connexion à MongoDB:', err);
    });

// Gestion des événements via Socket.IO
io.on('connection', (socket) => {
    console.log('Un nouvel utilisateur est connecté');

    // Ecoute de l'événement 'updateProduct' pour notifier tous les clients de la mise à jour des produits
    socket.on('updateProduct', () => {
        io.emit('productUpdated'); // Envoi de l'événement 'productUpdated' à tous les clients connectés
    });

    // Gestion de la déconnexion de l'utilisateur
    socket.on('disconnect', () => {
        console.log('Un utilisateur a été déconnecté');
    });
});

// Définition des routes API
app.use('/api/products', require('./routes/productRoutes'));  // Importation des routes produits depuis le fichier productRoutes.js

// Démarrage du serveur HTTP
server.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
});