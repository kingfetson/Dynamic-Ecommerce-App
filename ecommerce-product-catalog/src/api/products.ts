import axios from 'axios';

const API_URL = "https://fakestoreapi.com/products";

export const fetchProducts = async (limit = 10, page = 1) => {
  const res = await axios.get(`${API_URL}?limit=${limit}&page=${page}`);
  return res.data;
};
