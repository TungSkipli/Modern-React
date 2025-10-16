import { useState } from 'react';

const useSort = (initialData) => {
  const [data, setData] = useState(initialData);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
    
    const sorted = [...data].sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setData(sorted);
  };

  return {
    data,
    sortBy,
    sortOrder,
    handleSort,
    setData
  };
};

export default useSort;