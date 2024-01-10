import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validateRegisterForm from './validation/validateRegisterForm';
import FormField from './FormField';

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServerResponse = async (response) => {
    if (response.status === 409) {
      const userConfirmed = window.confirm('Konto z podanym adresem E-mail już istnieje. Czy chcesz się zalogować?');
      if (userConfirmed) navigate('/login');
      return;
    }
    if (!response.ok) {
      throw new Error('Coś poszło nie tak przy rejestracji.');
    }
    navigate('/login', { message: 'Pomyślnie zarejestrowano. Możesz się teraz zalogować.' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateRegisterForm(formData);
    setFormErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:3001/api/addUser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, role: 'user' }),
        });
        await handleServerResponse(response);
      } catch (error) {
        console.error('Błąd podczas rejestracji:', error);
      }
    }
  };

  const formFields = [
    { type: 'text', name: 'firstName', placeholder: 'Imię' },
    { type: 'text', name: 'lastName', placeholder: 'Nazwisko' },
    { type: 'text', name: 'email', placeholder: 'Email' },
    { type: 'tel', name: 'phone', placeholder: 'Numer telefonu' },
    { type: 'password', name: 'password', placeholder: 'Hasło' },
    { type: 'password', name: 'confirmPassword', placeholder: 'Powtórz hasło' },
  ];

  return (
    <div>
      <p><Link to="/">Strona główna</Link></p>
      <h2>Formularz rejestracji</h2>
      <form onSubmit={handleSubmit}>
        {formFields.map(field => (
          <FormField
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleChange}
            error={formErrors[field.name]}
          />
        ))}
        <button type="submit">Zarejestruj się</button>
      </form>
      <p>Masz już konto? <Link to="/login">Zaloguj się!</Link></p>
    </div>
  );
}

export default RegisterForm;
