import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_BY_CATEGORY_ID, GET_ALL_PRODUCTS } from './config'; // Import the queries
import './Product.css';
function Products({ categoryId }) {
  const { loading, error, data } = useQuery(
    categoryId ? GET_PRODUCTS_BY_CATEGORY_ID : GET_ALL_PRODUCTS, // Use the appropriate query
    {
      variables: { categoryId },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Error fetching products:', error);
    return <p>Error :(</p>;
  }

  if (data) {
    const products = categoryId
      ? data.category.products.edges || []
      : data.products.edges || []; // Check if categoryId is provided

    return (
      <div>
        {categoryId ? null : <h2>All Products</h2>} {/* Display "All Products" only when no category is selected */}
        <div className="product-container">
          {products.map((product) => (
            <div className="product-card" key={product.node.id}>
              {/* Check if images are available before rendering */}
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
