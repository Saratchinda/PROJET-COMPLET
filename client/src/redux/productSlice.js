import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * Action asynchrone pour récupérer la liste des produits depuis l'API.
 */
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', 
  async () => {
    const response = await axios.get('http://localhost:5000/api/products'); 
    return response.data; 
  }
);

/**
 * Action asynchrone pour supprimer un produit par son ID via l'API.
 * @param {string} id 
 */
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct', 
  async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`); 
    return id;
  }
);

/**
 * Slice Redux pour gérer les produits.
 */
const productSlice = createSlice({
  name: 'products', // Nom du slice pour l'identification dans Redux
  initialState: {
    items: [], // Liste des produits
    status: 'idle', // État actuel : 'idle', 'loading', 'succeeded', ou 'failed'
    error: null, // Contient le message d'erreur si une requête échoue
  },
  reducers: {
    // Pas de reducers synchrones pour le moment, mais l'espace est prêt pour des besoins futurs
  },
  extraReducers: (builder) => {
    builder
      /**
       * Gestion des différents états pour fetchProducts.
       */
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'; // Mise à jour de l'état lors de la requête
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'; // La requête a réussi
        state.items = action.payload; // Mise à jour de la liste des produits
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'; // Échec de la requête
        state.error = action.error.message; // Enregistrement de l'erreur
      })
      /**
       * Gestion des différents états pour deleteProduct.
       */
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (product) => product._id !== action.payload // Supprime le produit du store en fonction de son ID
        );
      });
  },
});

export default productSlice.reducer;
