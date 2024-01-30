import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';

function LatestOrders() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/orders/search?search=${searchQuery}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setOrders([]);
      }
    };

    if (searchQuery.length > 0) {
      fetchOrders();
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <h2>Ostatnie Zamówienia</h2>

      <input 
        className='form-control mb-3'
        type="text" 
        placeholder="Szukaj..." 
        value={searchQuery} 
        onChange={handleSearchChange}
      />

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID Zamówienia</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user_email}</td>
              <td>{order.user_phone}</td>
              <td>
                <Button variant="outline-primary">
                  <PencilSquare /> 
                  <span className="d-none d-md-inline"> Edytuj</span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default LatestOrders;
