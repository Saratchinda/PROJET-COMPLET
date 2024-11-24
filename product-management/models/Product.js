const mongoose = require('mongoose'); // Importation de Mongoose pour la gestion de la base de données MongoDB

// Définition du schéma pour les produits
const ProductSchema = new mongoose.Schema({
  name: {
    type: String, // Nom du produit (chaîne de caractères)
    required: true, // Champ obligatoire
    trim: true, // Supprime les espaces inutiles en début/fin
  },
  type: {
    type: String, // Type ou catégorie du produit
    required: true, // Champ obligatoire
    trim: true, // Nettoyage des espaces superflus
  },
  price: {
    type: Number, // Prix du produit (nombre)
    required: true, // Champ obligatoire
    min: 0, // Validation : le prix ne peut pas être négatif
  },
  rating: {
    type: Number, // Note du produit (nombre flottant)
    required: true, // Champ obligatoire
    min: 0, // Note minimale
    max: 5, // Note maximale
  },
  warranty_years: {
    type: Number, // Durée de garantie en années
    required: true, // Champ obligatoire
    min: 0, // Validation : la garantie ne peut pas être négative
  },
  available: {
    type: Boolean, // Disponibilité du produit (vrai ou faux)
    required: true, // Champ obligatoire
  },
}, {
  timestamps: true, // Ajoute automatiquement les champs createdAt et updatedAt
});

// Création du modèle Mongoose pour les produits
// Le nom du modèle sera 'Product' et il sera lié au schéma défini
module.exports = mongoose.model('Product', ProductSchema);   