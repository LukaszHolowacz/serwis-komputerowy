import React from 'react';
import { Card, Form, FormGroup, Col, Button, Row } from 'react-bootstrap';

const DiscountCodeForm = () => (
  <Card className='mb-3'>
    <Card.Body>
      <FormGroup as={Row}>
        <Col sm={7}>
          <Form.Control type="text" placeholder="Kod rabatowy" />
        </Col>
        <Col sm={5}>
          <Button variant="primary" type="button">Zatwierdź</Button>
        </Col>
      </FormGroup>
    </Card.Body>
  </Card>
);

export default DiscountCodeForm;
