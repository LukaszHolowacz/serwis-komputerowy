import axios from 'axios';

const baseURL = 'http://localhost:3001/products'; 

export const fetchProductCategories = async () => {
  try {
    const response = await axios.get(`${baseURL}/get-products-categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product categories: ', error);
    throw error;
  }
};
