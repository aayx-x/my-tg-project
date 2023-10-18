import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_BY_CATEGORY_ID, GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_ASCENDING_RATING } from './config'; // Import the queries
import './Product.css';

function Products({ categoryId }) {
  const [sortByRating, setSortByRating] = useState(false);
  const [buttonText, setButtonText] = useState('Sort by: Highest Rating');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Reset the selected product when categoryId changes
  useEffect(() => {
    setSelectedProduct(null);
  }, [categoryId]);

  const { loading, error, data } = useQuery(
    sortByRating
      ? GET_ALL_PRODUCTS_ASCENDING_RATING
      : categoryId ? GET_PRODUCTS_BY_CATEGORY_ID : GET_ALL_PRODUCTS,
    {
      variables: { categoryId },
    }
  );

  const handleSortByRating = () => {
    setSortByRating(!sortByRating);
    setButtonText(sortByRating ? 'Sort by: Highest Rating' : 'Sort by: Default');
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Error fetching products:', error);
    return <p>Error :(</p>;
  }

  if (selectedProduct) {
    // Display the selected product's details
    const { node } = selectedProduct;
    const descriptionData = node.description ? JSON.parse(node.description) : null;
    const descriptionText = descriptionData ? descriptionData.blocks[0]?.data?.text : null;

    return (
      <div className="product-page">
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
        <h3 className="product-name">{node.name}</h3>
        {descriptionText && (
          <p className="product-description">{descriptionText}</p>
        )}
        {node.images && node.images.length > 0 && (
          <div className="product-images">
            {node.images.map((image) => (
              <img key={image.id} src={image.url} alt={node.name} className="product-image" />
            ))}
          </div>
        )}
        {/* Add any additional product details you want to display */}
      </div>
    );
  }

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
          <div className="product-card" key={product.node.id} onClick={() => handleProductClick(product)}>
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
