// config.js
import { gql } from '@apollo/client';

// Define your GraphQL query for fetching categories
export const CATEGORY_LIST_QUERY = gql`
  query {
    categories(first: 10) {
      edges {
        node {
          id
          name
          description
        }
      }
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY_ID = gql`
  query GetProductsByCategoryId($categoryId: ID!) {
    category(id: $categoryId) {
      id
      name
      products(first: 50, channel: "default-channel") {
        edges {
          node {
            id
            name
            images {
              id
              url
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products(first: 50, channel: "default-channel") {
      edges {
        node {
          id
          name
          images {
            id
            url
          }
        }
      }
    }
  }
`;

export const GET_ALL_PRODUCTS_ASCENDING_RATING = gql`
  query GetAllProductsAscendingRating {
    products(first: 100, channel: "default-channel", sortBy: { field: RATING, direction: ASC}) {
      edges {
        node {
          id
          name
          images {
            id
            url
          }
        }
      }
    }
  }
`;

    
