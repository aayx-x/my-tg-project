import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_BY_CATEGORY_ID, GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_ASCENDING_RATING } from './config'; // Import the queries
import './Product.css';

function Products({ categoryId }) {
  const [sortByRating, setSortByRating] = useState(false);

  useEffect(() => {
    setSortByRating(false); // Reset sortByRating when the categoryId changes
  }, [categoryId]);

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

  const buttonText = sortByRating
    ? 'Sort by : default'
    : 'Sort by : highest rating';

  const handleSortByRating = () => {
    setSortByRating(!sortByRating);
  };

  if (data) {
    const products = sortByRating
      ? data.products.edges || [] // Use this structure for sorting by rating
      : categoryId
      ? data.category.products.edges || [] // Use this structure for category-specific view
      : data.products.edges || []; // Use this structure for the default view

    return (
      <div>
        {categoryId ? null : <h2>All Products</h2>}
        {categoryId ? null : (
          <button className="sort-button" onClick={handleSortByRating}>
            {buttonText}
          </button>
        )}
        <div className="product-container">
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
      </div>
    );
  }

  return null;
}

export default Products;
