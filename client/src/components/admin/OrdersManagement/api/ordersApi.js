import axios from 'axios';

const baseURL = 'http://localhost:3001/orders';

export const fetchOrders = async (searchQuery, sortOrder, orderStatus) => {
  try {
    const response = await axios.get(`${baseURL}/search`, {
      params: { search: searchQuery, sortOrder, status: orderStatus },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};

export const changeOrderStatus = async (orderId, newStatus) => {
  try { 
    const response = await axios.get(`${baseURL}/change-order-status`, {
      params: { orderId: orderId, status: newStatus},
    });
    return response.message;
  } catch (error) {
    console.error('Wystąpił błąd podczas zmiany statusu zamówienia', error);
    throw error;
  }
};
