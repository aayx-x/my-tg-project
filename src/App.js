// App.js

import React from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './App.css';
import logo from './tg.png';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://tokengifts-dev.saleor.cloud/graphql/', // Replace with your GraphQL API endpoint
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <img
          src={logo} // Replace with the actual path to your logo image
          alt="Your Logo"
          className="logo"
          
        />
        
        <Navbar /> {/* Include the Navbar component */}
      </div>
    </ApolloProvider>
  );
}

export default App;
