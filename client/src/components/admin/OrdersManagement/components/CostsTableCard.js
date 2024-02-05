import React from 'react';
import { Card, Table } from 'react-bootstrap';

const CostsTableCard = () => (
  <Card className='mb-3'>
    <Card.Body>
      <Card.Title>Koszta</Card.Title>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>Całkowity koszt produktów</th>
            <td>1000zł</td>
          </tr>
          <tr>
            <th>Użytkownik zapłaci</th>
            <td>1150zł</td>
          </tr>
          <tr>
            <th>Całkowity zarobek</th>
            <td>150zł</td>
          </tr>
        </tbody>
      </Table>
    </Card.Body>
  </Card>
);

export default CostsTableCard;
