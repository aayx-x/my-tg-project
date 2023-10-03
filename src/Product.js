import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_BY_CATEGORY_ID } from './config';
import './Product.css'; // Import the CSS file

function Products({ categoryId }) {
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY_ID, {
    variables: { categoryId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Error fetching products:', error);
    return <p>Error :(</p>;
  }

  if (data && data.category && data.category.products && data.category.products.edges) {
    const products = data.category.products.edges || [];

    return (
      <div className="product-container">
        {products.map((product) => (
          <div className="product-card" key={product.node.id}>
            {product.node.images.length > 0 && (
              <img
                className="product-image"
                src={product.node.images[0].url}
                alt={product.node.name}
              />
            )}
            <h3 className="product-name">{product.node.name}</h3>
            <p className="product-description">{product.node.description}</p>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default Products;
