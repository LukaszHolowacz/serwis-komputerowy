import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const SearchFilters = ({ searchQuery, sortOrder, orderStatus, onSearchChange, onSortChange, onStatusChange }) => {
  return (
    <Row className="mb-3">
      <Col>
        <Form.Control
          type="text"
          placeholder="Szukaj..."
          value={searchQuery}
          onChange={onSearchChange}
        />
      </Col>
      <Col xs="auto">
        <Form.Select value={sortOrder} onChange={onSortChange}>
          <option value="date_desc">Data malejąco</option>
          <option value="date_asc">Data rosnąco</option>
          <option value="id_desc">ID zamówienia malejąco</option>
          <option value="id_asc">ID zamówienia rosnąco</option>
        </Form.Select>
      </Col>
      <Col xs="auto">
          <Form.Select value={orderStatus} onChange={onStatusChange}>
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
  );
};

export default SearchFilters;
