// src/components/FilterBar.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { setCategoryFilter } from '../store/productSlice';

const categories = ["All", "electronics", "jewelery", "men's clothing", "women's clothing"];

const FilterBar: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex space-x-2 mb-4 overflow-x-auto">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => dispatch(setCategoryFilter(cat))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
