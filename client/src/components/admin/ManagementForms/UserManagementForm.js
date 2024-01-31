import React from "react";
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'react-bootstrap';

function UserManagementForm({ user, setActiveTab }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Tutaj logika do przetwarzania danych formularza
    console.log("Form data submitted");
  };

  return (
    <div>
      <h3 className="mb-3">Zarządzanie użytkownikiem nr. {user.id}</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3" as={Row}>
          <Form.Label column sm={2}>
            Imię:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Wpisz imię" value={user?.name || ''}/>
          </Col>
        </FormGroup>

        <FormGroup className="mb-3" as={Row}>
          <Form.Label column sm={2}>
            Nazwisko:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Wpisz nazwisko" value={user?.surname || ''}/>
          </Col>
        </FormGroup>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalRole">
            <Form.Label column sm={2}>
                Rola:
            </Form.Label>
            <Col sm={10}>
                <Form.Select aria-label="Wybierz rolę" defaultValue={user?.role}>
                <option value="user">Użytkownik</option>
                <option value="admin">Admin</option>
                </Form.Select>
            </Col>
        </Form.Group>

        <FormGroup className="mb-3" as={Row}>
          <Form.Label column sm={2}>
            Email:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="Wpisz email" value={user?.email || ''}/>
          </Col>
        </FormGroup>

        <FormGroup className="mb-3" as={Row}>
          <Form.Label column sm={2}>
            Numer telefonu:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Wpisz numer telefonu" value={user?.phone_nbr || ''}/>
          </Col>
        </FormGroup>

        <FormGroup as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Zapisz zmiany</Button>{' '}
            <Button variant="secondary" onClick={() => setActiveTab('user-management')}>
              Powrót
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default UserManagementForm;
