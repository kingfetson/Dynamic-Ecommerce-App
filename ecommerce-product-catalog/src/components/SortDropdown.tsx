// src/components/SortDropdown.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { setPriceSort } from '../store/productSlice';

const SortDropdown: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="mb-4">
      <label className="mr-2 font-medium">Sort by Price:</label>
      <select
        onChange={(e) => dispatch(setPriceSort(e.target.value))}
        className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
      >
        <option value="none">Default</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>
  );
};

export default SortDropdown;
