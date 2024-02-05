import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ChangeStatusButtons = () => (
  <Card>
    <Card.Body>
      <Card.Title>Zmień status</Card.Title>
      <Button variant="success" type="button" className="mb-3">Przyjmij zamówienie do realizacji</Button>
      <Button variant="danger" type="button" className="mb-3">Anuluj zamówienie</Button>
    </Card.Body>
  </Card>
);

export default ChangeStatusButtons;
