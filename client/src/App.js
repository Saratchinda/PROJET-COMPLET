import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import ProductList from './components/ProductList'; 
import ProductForm from './components/ProductForm'; 

/**
 * Composant principal de l'application.
 * Il gère les routes pour naviguer entre les différentes pages.
 */
function App() {
  return (
    <Router>
      {/* Déclaration des routes de l'application */}
      <Routes>
        {/* Route principale affichant la liste des produits */}
        <Route path="/" element={<ProductList />} />
        {/* Route pour ajouter ou modifier un produit (paramètre "id" optionnel) */}
        <Route path="/product/:id?" element={<ProductForm />} />
      </Routes>
    </Router>
  );
}

export default App; 
