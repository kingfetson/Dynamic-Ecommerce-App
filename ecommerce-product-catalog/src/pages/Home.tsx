import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { getProducts, Product } from '../store/productSlice';
import FilterBar from '../components/FilterBar';
import SortDropdown from '../components/SortDropdown';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredItems, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Catalog</h1>
      <FilterBar />
      <SortDropdown />
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((product: Product) => (
            <div key={product.id} className="border rounded p-4 shadow hover:shadow-lg transition">
              <img
                src={product.image}
                alt={product.title}
                className="h-40 w-full object-contain mb-2"
              />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))
        ) : (
          !loading && <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
