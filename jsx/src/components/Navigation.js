import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav style={{ 
      margin: '20px', 
      padding: '10px', 
      borderBottom: '2px solid #ccc',
      backgroundColor: '#f8f9fa'
    }}>
      <Link 
        to="/translate" 
        style={{ 
          marginRight: '15px', 
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          display: 'inline-block'
        }}
      >
        Translate
      </Link>
      <Link 
        to="/animals" 
        style={{ 
          marginRight: '15px', 
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          display: 'inline-block'
        }}
      >
        Animals
      </Link>
      <Link 
        to="/search-image" 
        style={{ 
          marginRight: '15px', 
          padding: '10px 20px',
          backgroundColor: '#17a2b8',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          display: 'inline-block'
        }}
      >
        Search Image
      </Link>
      <Link 
        to="/book" 
        style={{ 
          marginRight: '15px', 
          padding: '10px 20px',
          backgroundColor: '#d18db5',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          display: 'inline-block'
        }}
      >
        Books
      </Link>
      <Link 
        to="/accordion" 
        style={{ 
          marginRight: '15px', 
          padding: '10px 20px',
          backgroundColor: '#8ecc57ff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          display: 'inline-block'
        }}
      >
        accordion
      </Link>
      <Link 
        to="/dropDown" 
        style={{ 
          marginRight: '15px', 
          padding: '10px 20px',
          backgroundColor: '#3e54cdff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          display: 'inline-block'
        }}
      >
        DropDown
      </Link>
      <Link
        to="/modal"
        style={{
          marginRight: '15px',
          padding: '10px 20px',
          backgroundColor: '#ffc107',
          color: 'black',
          textDecoration: 'none',
          borderRadius: '5px',
          display: 'inline-block'
        }}
      >
        Modal
      </Link>
      <Link
        to="/table"
        style={{
          marginRight: '15px',
          padding: '10px 20px',
          backgroundColor: '#ff6b6b',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          display: 'inline-block'
        }}
      >
        Fruit Table
      </Link>
      <Link
        to="/sort-list"
        style={{
          marginRight: '15px',
          padding: '10px 20px',
          backgroundColor: '#6c5ce7',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          display: 'inline-block'
        }}
      >
        Sort List
      </Link>
    </nav>
  );
}

export default Navigation;