const express = require('express'); // Importation d'Express pour la gestion des routes
const Product = require('../models/Product'); // Importation du modèle Product pour interagir avec la base de données
const router = express.Router(); // Création d'un routeur Express

// Route pour obtenir tous les produits
router.get('/', async (req, res) => {
    try {
        // Récupérer tous les produits depuis la base de données
        const products = await Product.find();
        res.json(products); // Retourner les produits au format JSON
    } catch (err) {
        // En cas d'erreur, retourner une réponse avec un statut 500 et un message d'erreur
        res.status(500).json({ error: err.message });
    }
});

// Route pour ajouter un nouveau produit
router.post('/', async (req, res) => {
    try {
        // Créer une nouvelle instance de produit avec les données du corps de la requête
        const newProduct = new Product(req.body);
        // Sauvegarder le produit dans la base de données
        const savedProduct = await newProduct.save();
        // Retourner une réponse avec un statut 201 (créé) et le produit sauvegardé
        res.status(201).json(savedProduct);
    } catch (err) {
        // En cas d'erreur, retourner une réponse avec un statut 400 et un message d'erreur
        res.status(400).json({ error: err.message });
    }
});

// Route pour modifier un produit existant
router.put('/:id', async (req, res) => {
    try {
        // Trouver un produit par ID et le mettre à jour avec les nouvelles données
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, // ID du produit à modifier
            req.body, // Données de mise à jour
            { new: true } // Retourner l'objet mis à jour
        );
        // Retourner le produit mis à jour
        res.json(updatedProduct);
    } catch (err) {
        // En cas d'erreur, retourner une réponse avec un statut 400 et un message d'erreur
        res.status(400).json({ error: err.message });
    }
});

// Route pour supprimer un produit
router.delete('/:id', async (req, res) => {
    try {
        // Trouver un produit par ID et le supprimer
        await Product.findByIdAndDelete(req.params.id);
        // Retourner un message de confirmation
        res.json({ message: 'Produit supprimé' });
    } catch (err) {
        // En cas d'erreur, retourner une réponse avec un statut 500 et un message d'erreur
        res.status(500).json({ error: err.message });
    }
});

// Exportation du routeur pour qu'il puisse être utilisé dans l'application principale
module.exports = router;