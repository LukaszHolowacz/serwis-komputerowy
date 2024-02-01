import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Form, FormGroup, Col, Row, Alert } from 'react-bootstrap';

function UserManagementForm({ user, setActiveTab }) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    role: 'user',
    email: '',
    phone_nbr: ''
  });

  const [error, setError] = useState("");
  const [isBanned, setIsBanned] = useState(user?.is_banned || false);

  useEffect(() => {
    resetFormData();
  }, [user]);

  const resetFormData = () => {
    setFormData({
      name: user?.name || '',
      surname: user?.surname || '',
      role: user?.role || 'user',
      email: user?.email || '',
      phone_nbr: user?.phone_nbr || ''
    });
    setIsBanned(user?.is_banned || false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put('http://localhost:3001/users/update-user', {
        id: user?.id,
        firstName: formData.name,
        lastName: formData.surname,
        role: formData.role,
        email: formData.email,
        phoneNumber: formData.phone_nbr
      });

      if (response.data.success) {
        alert("Dane użytkownika zostały zaktualizowane.");
        setActiveTab('user-management');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Wystąpił błąd podczas aktualizacji danych użytkownika");
    }
  };

  const toggleBanStatus = async () => {
    const action = isBanned ? 'unban' : 'ban';
    const confirmAction = window.confirm(`Czy na pewno chcesz ${isBanned ? 'odblokować' : 'zablokować'} tego użytkownika?`);

    if (confirmAction) {
      try {
        const response = await axios.put(`http://localhost:3001/users/${action}-user`, { id: user?.id });

        if (response.data.success) {
          setIsBanned(!isBanned);
          alert(`Użytkownik został ${isBanned ? 'odblokowany' : 'zablokowany'}.`);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        setError(error.response?.data?.message || `Wystąpił błąd podczas ${isBanned ? 'odblokowywania' : 'blokowania'} użytkownika`);
      }
    }
  };

  return (
    <div>
      <h3 className="mb-3">Zarządzanie użytkownikiem nr. {user.id}</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3" as={Row}>
          <Form.Label column sm={2}>
            Imię:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="name" placeholder="Wpisz imię" value={formData.name} onChange={handleInputChange}/>
          </Col>
        </FormGroup>

        <FormGroup className="mb-3" as={Row}>
          <Form.Label column sm={2}>
            Nazwisko:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="surname" placeholder="Wpisz nazwisko" value={formData.surname} onChange={handleInputChange}/>
          </Col>
        </FormGroup>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalRole">
            <Form.Label column sm={2}>
                Rola:
            </Form.Label>
            <Col sm={10}>
                <Form.Select name="role" aria-label="Wybierz rolę" value={formData.role} onChange={handleInputChange}>
                  <option value="user">Użytkownik</option>
                  <option value="admin">Admin</option>
                </Form.Select>
            </Col>
        </Form.Group>

        <FormGroup className="mb-3" as={Row}>
          <Form.Label column sm={2}>
            E-mail:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" name="email" placeholder="Wpisz email" value={formData.email} onChange={handleInputChange}/>
          </Col>
        </FormGroup>

        <FormGroup className="mb-3" as={Row}>
          <Form.Label column sm={2}>
            Numer telefonu:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="phone_nbr" placeholder="Wpisz numer telefonu" value={formData.phone_nbr} onChange={handleInputChange}/>
          </Col>
        </FormGroup>

        <FormGroup as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Zapisz zmiany</Button>{' '}
            <Button variant={isBanned ? 'success' : 'warning'} onClick={toggleBanStatus}>
              {isBanned ? 'Odblokuj' : 'Zablokuj'}
            </Button>{' '}
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
