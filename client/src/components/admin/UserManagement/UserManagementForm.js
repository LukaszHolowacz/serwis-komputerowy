import React, { useState, useEffect } from "react";
import { useForm } from './hooks/useForm';
import { updateUser, toggleUserBanStatus } from './api/usersApi';
import { Button, Form, FormGroup, Col, Row, Alert } from 'react-bootstrap';
import FormField from './components/FormField'

function UserManagementForm({ user, setActiveTab }) {
  const initialFormState = { name: '', surname: '', role: 'user', email: '', phone_nbr: '' };
  const [formData, handleInputChange, resetFormData] = useForm(initialFormState);
  const [error, setError] = useState("");
  const [isBanned, setIsBanned] = useState(user?.is_banned || false);

  const formFieldsData = [
    { label: "Imię", type: "text", name: "name", placeholder: "Wpisz imię" },
    { label: "Nazwisko", type: "text", name: "surname", placeholder: "Wpisz nazwisko" },
    {
      label: "Rola",
      type: "select",
      name: "role",
      options: [
        { value: "user", label: "Użytkownik" },
        { value: "admin", label: "Admin" }
      ]
    },
    { label: "E-mail", type: "email", name: "email", placeholder: "Wpisz email" },
    { label: "Numer telefonu", type: "text", name: "phone_nbr", placeholder: "Wpisz numer telefonu" },
  ];
  

  useEffect(() => {
    if (user) {
      resetFormData({
        name: user.name || '',
        surname: user.surname || '',
        role: user.role || 'user',
        email: user.email || '',
        phone_nbr: user.phone_nbr || '',
      });
      setIsBanned(user.is_banned || false);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateUser({
        id: user?.id,
        ...formData
      });
      alert("Dane użytkownika zostały zaktualizowane.");
      setActiveTab('user-management');
    } catch (error) {
      setError(error.response?.data?.message || "Wystąpił błąd podczas aktualizacji danych użytkownika");
    }
  };

  const handleToggleBanStatus = async () => {
    const action = isBanned ? 'unban' : 'ban';
    const confirmAction = window.confirm(`Czy na pewno chcesz ${isBanned ? 'odblokować' : 'zablokować'} tego użytkownika?`);
    if (confirmAction) {
      try {
        await toggleUserBanStatus(user?.id, action);
        setIsBanned(!isBanned);
        alert(`Użytkownik został ${isBanned ? 'odblokowany' : 'zablokowany'}.`);
      } catch (error) {
        setError(error.response?.data?.message || `Wystąpił błąd podczas ${isBanned ? 'odblokowywania' : 'blokowania'} użytkownika`);
      }
    }
  };

  return (
    <div>
      <div xs={12} className="d-flex justify-content-between">
        <Button variant="outline-primary" onClick={() => setActiveTab('user-management')} className="mr-2 mb-3 mt-3">
          Powrót
        </Button>
        <h3 className="mr-2 mb-3 mt-3">Zarządzanie użytkownikiem nr. {user.id}</h3>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        {formFieldsData.map(field => (
          <FormField
            key={field.name}
            label={field.label}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleInputChange}
            options={field.options || []} 
          />
        ))}
        <FormGroup as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Zapisz zmiany</Button>{' '}
            <Button variant={isBanned ? 'success' : 'warning'} onClick={handleToggleBanStatus}>
              {isBanned ? 'Odblokuj' : 'Zablokuj'}
            </Button>{' '}
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default UserManagementForm;
