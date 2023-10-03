// App.js

import React from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://demo.saleor.io/graphql/', // Replace with your GraphQL API endpoint
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Navbar /> {/* Include the Navbar component */}
      </div>
    </ApolloProvider>
  );
}

export default App;
