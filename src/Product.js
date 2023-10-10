// Products.js

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_BY_CATEGORY_ID, GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_ASCENDING_RATING } from './config'; // Import the queries
import './Product.css';

function Products({ categoryId }) {
  const [sortByRating, setSortByRating] = useState(false);
  const [buttonText, setButtonText] = useState('Sort by: Highest Rating');

  const { loading, error, data } = useQuery(
    sortByRating
      ? GET_ALL_PRODUCTS_ASCENDING_RATING
      : categoryId ? GET_PRODUCTS_BY_CATEGORY_ID : GET_ALL_PRODUCTS,
    {
      variables: { categoryId },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Error fetching products:', error);
    return <p>Error :(</p>;
  }

  const handleSortByRating = () => {
    setSortByRating(!sortByRating);
    setButtonText(sortByRating ? 'Sort by: Highest Rating' : 'Sort by: Default');
  };

  if (data) {
    const products = categoryId
      ? data.category.products.edges || []
      : data.products.edges || [];

    return (
      <div className="product-container">
        {!categoryId && (
          <button className="sort-button" onClick={handleSortByRating}>
            {buttonText}
          </button>
        )}
        {products.map((product) => (
          <div className="product-card" key={product.node.id}>
            {product.node.images && product.node.images.length > 0 && (
              <img
                src={product.node.images[0].url}
                alt={product.node.name}
                className="product-image"
              />
            )}
            <div className="product-details">
              <h3 className="product-name">{product.node.name}</h3>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default Products;
