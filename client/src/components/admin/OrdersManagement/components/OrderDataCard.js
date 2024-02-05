import React from 'react';
import { Card } from 'react-bootstrap';
import { formatDate } from '../../../../utils/dateFormatter';

const OrderDataCard = ({ order }) => (
  <Card className="mb-3 h-100">
    <Card.Body>
      <Card.Title className='mb-3'>Dane zamówienia</Card.Title>
      <p><strong>ID:</strong> {order.id}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Data zamówienia:</strong> {formatDate(order.order_date)}</p>
      <p><strong>Adres wysyłki:</strong> Buraczana 45a/10 Gdynia 81-587</p>
    </Card.Body>
  </Card>
);

export default OrderDataCard;
