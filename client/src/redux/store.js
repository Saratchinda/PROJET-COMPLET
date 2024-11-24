import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice'; 

/**
 * Configuration du store Redux pour l'application.
 * Ce store centralise les états et les reducers utilisés dans l'application.
 */
const store = configureStore({
  reducer: {
    // Association du reducer des produits au nom "products"
    products: productReducer,
  },
});

export default store; 
