import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

function UserFilters({ searchQuery, onSearchChange, sortOrder, onSortChange, filter, onFilterChange }) {
  return (
    <Row className="mb-3">
      <Col>
        <input
          className="form-control"
          type="text"
          placeholder="Szukaj..."
          value={searchQuery}
          onChange={onSearchChange}
        />
      </Col>
      <Col xs="auto">
        <Form.Select onChange={onSortChange} value={sortOrder}>
          <option value="id_desc">ID malejąco</option>
          <option value="id_asc">ID rosnąco</option>
        </Form.Select>
      </Col>
      <Col xs="auto">
        <Form.Select onChange={onFilterChange} value={filter}>
          <option value="all">Wszyscy użytkownicy</option>
          <option value="banned">Wyświetlaj tylko zablokowanych</option>
          <option value="unbanned">Wyświetlaj tylko odblokowanych</option>
        </Form.Select>
      </Col>
    </Row>
  );
}

export default UserFilters;
