import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_BY_CATEGORY_ID, GET_ALL_PRODUCTS } from './config'; // Import the queries

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
        {categoryId ? (
          <h2>All Products</h2> // Display "All Products" only when categoryId is provided
        ) : null}
        {products.map((product) => (
          <div key={product.node.id}>
            <h3>{product.node.name}</h3>
            <p>{product.node.description}</p>
            {product.node.images.length > 0 && (
              <img
                src={product.node.images[0].url}
                alt={product.node.name}
                width="250" // Adjust the image size as needed
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default Products;
