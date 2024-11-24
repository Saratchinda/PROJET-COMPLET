import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

/**
 * Formulaire pour ajouter ou modifier un produit.
 */
const ProductForm = () => {
  // État local pour stocker les données du produit.
  const [product, setProduct] = useState({
    name: '', 
    type: '', 
    price: 0, 
    rating: 0, 
    warranty_years: 0, 
    available: false, 
  });

  // Récupération des paramètres de l'URL.
  const { id } = useParams();
  const navigate = useNavigate();

  /**
   * Chargement des informations du produit si un ID est fourni (mode édition).
   */
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/products/${id}`)
        .then((response) => setProduct(response.data))
        .catch((err) => console.error('Erreur lors du chargement du produit:', err));
    }
  }, [id]);

  /**
   * Gestion de la modification des champs du formulaire.
   * @param {object} event - Événement du champ modifié.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Met à jour uniquement le champ modifié dans l'état local.
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'price' || name === 'rating' || name === 'warranty_years' 
        ? parseFloat(value) || 0 // Conversion automatique des nombres
        : value,
    }));
  };

  /**
   * Gestion de la soumission du formulaire.
   * @param {object} event - Événement de soumission.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // Sélectionne la requête appropriée en fonction de l'ID.
    const apiCall = id
      ? axios.put(`http://localhost:5000/api/products/${id}`, product)
      : axios.post('http://localhost:5000/api/products', product);

    // Traite la réponse et redirige vers la liste des produits.
    apiCall
      .then(() => {
        console.log('Produit sauvegardé avec succès.');
        navigate('/'); // Redirection après sauvegarde.
      })
      .catch((err) => console.error('Erreur lors de la sauvegarde:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Modifier le produit' : 'Ajouter un nouveau produit'}</h2>

      {/* Champ: Nom */}
      <TextField
        label="Nom du produit"
        name="name"
        value={product.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      {/* Champ: Type */}
      <TextField
        label="Type de produit"
        name="type"
        value={product.type}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      {/* Champ: Prix */}
      <TextField
        label="Prix"
        name="price"
        type="number"
        value={product.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
        inputProps={{ min: 0 }}
        required
      />

      {/* Champ: Note */}
      <TextField
        label="Évaluation (sur 5)"
        name="rating"
        type="number"
        value={product.rating}
        onChange={handleChange}
        fullWidth
        margin="normal"
        inputProps={{ min: 0, max: 5 }}
        required
      />

      {/* Champ: Années de garantie */}
      <TextField
        label="Années de garantie"
        name="warranty_years"
        type="number"
        value={product.warranty_years}
        onChange={handleChange}
        fullWidth
        margin="normal"
        inputProps={{ min: 0 }}
        required
      />

      {/* Bouton de soumission */}
      <Button type="submit" variant="contained" color="primary">
        {id ? 'Mettre à jour' : 'Enregistrer'}
      </Button>
    </form>
  );
};

export default ProductForm;
