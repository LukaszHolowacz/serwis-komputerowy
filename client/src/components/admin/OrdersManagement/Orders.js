import React, { useState } from 'react';
import { Row, Col, Form, Table } from 'react-bootstrap';
import { useOrders } from './hooks/useOrders';
import { EditButton, CancelButton } from './components/ActionButton';
import SearchFilters from './components/SearchFilters';
import { cancelOrderApi } from './api/ordersApi';
import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';

function formatDate(dateString) {
  const parsedDate = parseISO(dateString);
  return format(parsedDate, "d MMMM yyyy HH:mm", { locale: pl });
}

function LatestOrders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const orders = useOrders(searchQuery, sortOrder, orderStatus);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };

  const cancelOrder = (orderId) => {
    cancelOrderApi(orderId);
    // Może być potrzebne odświeżenie listy zamówień po anulowaniu
  };

  return (
    <div>
      <h2>Zamówienia</h2>
      <SearchFilters
        searchQuery={searchQuery}
        sortOrder={sortOrder}
        orderStatus={orderStatus}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        onStatusChange={handleStatusChange}
      />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Data Zamówienia</th>
            <th>Status</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user_email}</td>
              <td>{order.user_phone}</td>
              <td>{formatDate(order.order_date)}</td>
              <td>{order.status}</td>
              <td>
                <EditButton onClick={() => console.log('Edycja', order.id)} />
                <CancelButton onClick={() => cancelOrder(order.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default LatestOrders;
