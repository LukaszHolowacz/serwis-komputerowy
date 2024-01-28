import React, { useState, useEffect } from 'react';

function LatestOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders([{ id: 1, date: "2024-01-20", total: 1200 }, { id: 2, date: "2024-01-22", total: 800 }]);
  }, []);

  return (
    <div>
      <h2>Ostatnie Zamówienia</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>Data: {order.date}, Wartość: {order.total} zł</li>
        ))}
      </ul>
    </div>
  );
}

export default LatestOrders;
