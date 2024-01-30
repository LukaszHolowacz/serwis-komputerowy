import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';

function formatDate(dateString) {
  const parsedDate = parseISO(dateString);
  return format(parsedDate, "d MMMM yyyy HH:mm", { locale: pl });
}


function LatestOrders() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/orders/search?search=${searchQuery}&sortOrder=${sortOrder}&status=${orderStatus}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [searchQuery, sortOrder, orderStatus]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };

  return (
    <div>
      <h2>Zamówienia</h2>

      <Row className="mb-3">
        <Col>
          <input 
            className='form-control'
            type="text" 
            placeholder="Szukaj..." 
            value={searchQuery} 
            onChange={handleSearchChange}
          />
        </Col>
        <Col xs="auto">
          <Form.Select style={{ width: "auto" }} onChange={handleSortChange}>
          <option value="date_desc">Po dacie malejąco</option>
            <option value="date_asc">Po dacie rosnąco</option>
            <option value="id_desc">Po ID zamówienia malejąco</option>
            <option value="id_asc">Po ID zamówienia rosnąco</option> 
          </Form.Select>
        </Col>
        <Col xs="auto">
          <Form.Select style={{ width: "auto" }} aria-label="Status zamówienia" onChange={handleStatusChange}>
            <option value="">Status zamówienia</option>
            <option value="pending">Oczekujące</option>
            <option value="cancelled">Anulowane</option>
            <option value="accepted">Przyjęte do realizacji</option>
            <option value="awaiting_payment">Oczekujące na płatność</option>
            <option value="in_progress">W realizacji</option>
            <option value="awaiting_shipment">Oczekujące na wysyłkę</option>
            <option value="shipped">Wysłane</option>
            <option value="completed">Zrealizowane</option>
          </Form.Select>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID Zamówienia</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Data Zamówienia</th>
            <th>Status</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user_email}</td>
              <td>{order.user_phone}</td>
              <td>{formatDate(order.order_date)}</td>
              <td>{order.status}</td>
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
