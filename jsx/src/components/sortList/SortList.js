import React from 'react';
import './SortList.css';
import useSort from '../../hooks/useSort';

const SortList = () => {
  const initialData = [
    { id: 1, name: 'Downtown Townhouse', price: 15000, rating: 4.8 },
    { id: 2, name: 'District 2 Apartment', price: 8500, rating: 4.2 },
    { id: 3, name: 'District 7 Villa', price: 25000, rating: 4.9 },
    { id: 4, name: 'District 3 Condo', price: 6200, rating: 4.1 },
    { id: 5, name: 'Main Street House', price: 18000, rating: 4.6 },
  ];

  const { data, sortBy, sortOrder, handleSort } = useSort(initialData);

  return (
    <div className="sort-container">
      <h2>Real Estate Properties</h2>
      
      <div className="sort-controls">
        <div className="sort-group">
          <span>Name:</span>
          <button 
            className={sortBy === 'name' && sortOrder === 'asc' ? 'active' : ''}
            onClick={() => handleSort('name', 'asc')}
          >
            A-Z
          </button>
          <button 
            className={sortBy === 'name' && sortOrder === 'desc' ? 'active' : ''}
            onClick={() => handleSort('name', 'desc')}
          >
            Z-A
          </button>
        </div>
        
        <div className="sort-group">
          <span>Price:</span>
          <button 
            className={sortBy === 'price' && sortOrder === 'asc' ? 'active' : ''}
            onClick={() => handleSort('price', 'asc')}
          >
            Low-High
          </button>
          <button 
            className={sortBy === 'price' && sortOrder === 'desc' ? 'active' : ''}
            onClick={() => handleSort('price', 'desc')}
          >
            High-Low
          </button>
        </div>
        
        <div className="sort-group">
          <span>Rating:</span>
          <button 
            className={sortBy === 'rating' && sortOrder === 'asc' ? 'active' : ''}
            onClick={() => handleSort('rating', 'asc')}
          >
            Low-High
          </button>
          <button 
            className={sortBy === 'rating' && sortOrder === 'desc' ? 'active' : ''}
            onClick={() => handleSort('rating', 'desc')}
          >
            High-Low
          </button>
        </div>
      </div>

      <div className="list-container">
        {data.map((item, index) => (
          <div key={item.id} className="list-item">
            <div className="item-info">
              <h3>{item.name}</h3>
              <div className="item-details">
                <span className="price">${item.price.toLocaleString()}K</span>
                <span className="rating">Rating: {item.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortList;