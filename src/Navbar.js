import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { CATEGORY_LIST_QUERY } from './config';
import './Navbar.css';
import Products from './Product';

function Navbar() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isPopupActive, setIsPopupActive] = useState(false); // Add state for the popup animation

  const { loading, error, data } = useQuery(CATEGORY_LIST_QUERY);

  useEffect(() => {
    // Load "Featured" category by default if data is available
    if (!loading && data) {
      const featuredCategory = data.categories.edges.find(
        (category) => category.node.name === 'Featured'
      );
      if (featuredCategory) {
        setSelectedCategory(featuredCategory.node);
      }
    }
    // Trigger the popup animation after a delay (adjust the delay as needed)
    const popupTimeout = setTimeout(() => {
      setIsPopupActive(true);
    }, 1000); // 1000 milliseconds (1 second) delay
    // Clear the timeout when the component unmounts
    return () => clearTimeout(popupTimeout);
  }, [loading, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const categories = data.categories.edges;

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={`navbar ${isPopupActive ? 'popup active' : ''}`}>
      <div className="exchange-section-header">
        <button className="exchange-header-icon">
          <i className="fas fa-chevron-up"></i>
        </button>
      </div>
      <ul>
        {categories.map((category) => (
          <li
            key={category.node.id}
            onClick={() => handleCategoryClick(category.node)}
            className={selectedCategory === category.node ? 'active' : ''}
          >
            {category.node.name}
          </li>
        ))}
      </ul>
      <div className="products-container">
        {selectedCategory && (
          <>
            <h2>{selectedCategory.name}</h2>
            <Products categoryId={selectedCategory.id} />
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
