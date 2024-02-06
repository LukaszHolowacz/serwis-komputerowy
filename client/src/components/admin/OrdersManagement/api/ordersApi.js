import axios from 'axios';

const baseURL = 'http://localhost:3001';

export const fetchOrders = async (searchQuery, sortOrder, orderStatus) => {
  try {
    const response = await axios.get(`${baseURL}/orders/search`, {
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
    const response = await axios.get(`${baseURL}/orders/change-order-status`, {
      params: { orderId: orderId, status: newStatus},
    });
    return response.message;
  } catch (error) {
    console.error('Wystąpił błąd podczas zmiany statusu zamówienia', error);
    throw error;
  }
};

export const fetchUserData = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/users/get-user-data`, { 
      params: { userId },
    });
    if (response.data.length === 0) {
      throw new Error('Nie znaleziono użytkownika o podanym id.');
    }
    return response.data[0]; 
  } catch (error) {
    console.error('Error fetching user data: ', error);
    throw error;
  }
};

export const fetchOrderProducts = async (orderId) => {
  try{
    const response = await axios.get(`${baseURL}/orders/get-order-products`, {
      params: { orderId }
    })
    if (response.data.length === 0) {
      throw new Error('Nie znaleziono zamówienia o podanym id.');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching order products: ', error);
    throw error;
  }
}

export const deleteOrderProduct = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/orders/delete-order-product`, {
      params: { id }
    });
    return response.data; 
  } catch (error) {
    console.error('Error deleting order product: ', error);
    throw error;
  }
};
