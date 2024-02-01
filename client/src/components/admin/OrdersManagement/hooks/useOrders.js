import { useState, useEffect } from 'react';
import { fetchOrders } from '../api/ordersApi';

export const useOrders = (searchQuery, sortOrder, orderStatus) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOrders(searchQuery, sortOrder, orderStatus);
        setOrders(data);
      } catch {
        setOrders([]);
      }
    };

    fetchData();
  }, [searchQuery, sortOrder, orderStatus]);

  return orders;
};
