import React from 'react';
import { Card, FormGroup, Row, Form } from 'react-bootstrap';
import questionsData from '../../../../assets/json/questions.json';
import '../../../../assets/css/aa.css';

const OrderDetailsCard = ({ orderDetails }) => {
  const filteredQuestions = questionsData.questions.filter(question => 
    orderDetails.hasOwnProperty(question.id.toString())
  );

  return (
    <Card className="mb-3 h-100 custom-card">
      <Card.Body>
        <Card.Title className='mb-3'>Szczegóły zamówienia</Card.Title>
        {filteredQuestions.map(question => {
          const answer = orderDetails[question.id.toString()];
          return (
            <FormGroup key={question.id} className='mb-3 border-top' as={Row}>
              <Form.Label column sm={8}>
                {question.question} 
              </Form.Label>
              <Form.Label column sm={4}>
                {answer} 
              </Form.Label>
            </FormGroup>
          );
        })}
      </Card.Body>
    </Card>
  );
};

export default OrderDetailsCard;