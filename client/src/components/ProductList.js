import React, { useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../redux/productSlice';

/**
 * Composant pour afficher la liste des produits.
 */
const ProductList = () => {
  const dispatch = useDispatch(); // Permet de déclencher des actions Redux
  const navigate = useNavigate(); // Permet de naviguer entre les pages

  // Extraction des données produits depuis le store Redux
  const { items: products, status, error } = useSelector((state) => state.products);

  /**
   * Charge les produits lors du premier rendu si le statut est 'idle'.
   */
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts()); // Action Redux pour récupérer les produits
    }
  }, [dispatch, status]);

  /**
   * Gère la suppression d'un produit.
   * @param {string} id - L'identifiant du produit à supprimer.
   */
  const handleDelete = (id) => {
    dispatch(deleteProduct(id)); // Action Redux pour supprimer un produit
  };

  // Affiche un message de chargement ou d'erreur si nécessaire
  if (status === 'loading') return <p>Chargement en cours...</p>;
  if (status === 'failed') return <p>Erreur : {error}</p>;

  return (
    <div>
      <h1>Liste des Produits</h1>

      {/* Bouton pour ajouter un nouveau produit */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/product')}
      >
        Ajouter un Produit
      </Button>

      {/* Tableau pour afficher les produits */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Prix</TableCell>
            <TableCell>Évaluation</TableCell>
            <TableCell>Années de Garantie</TableCell>
            <TableCell>Disponible</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.rating}</TableCell>
              <TableCell>{product.warranty_years}</TableCell>
              <TableCell>{product.available ? 'Oui' : 'Non'}</TableCell>
              <TableCell>
                {/* Bouton pour modifier un produit */}
                <Button 
                  onClick={() => navigate(`/product/${product._id}`)} 
                  variant="contained" 
                  color="primary"
                  style={{ marginRight: '8px' }}
                >
                  Modifier
                </Button>

                {/* Bouton pour supprimer un produit */}
                <Button 
                  onClick={() => handleDelete(product._id)} 
                  variant="contained" 
                  color="secondary"
                >
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductList;
