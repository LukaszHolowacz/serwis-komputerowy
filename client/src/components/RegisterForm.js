import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterForm() {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Walidacja danych formularza (opcjonalnie)
    // Upewnij się, że hasła są takie same, itp.
  
    // Wysyłanie danych do serwera
    try {
      const response = await fetch('http://localhost:3001/api/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: formData.firstName,
          lastname: formData.lastName, // Poprawka literówki w 'lastname'
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: 'user' // Jeśli chcesz wysłać rolę, opcjonalnie
        }),
      });
  
      if (!response.ok) {
        throw new Error('Coś poszło nie tak przy rejestracji.');
      }
  
      const data = await response.json();
      console.log(data);
      // Dalsze działania, np. przekierowanie po pomyślnej rejestracji
  
    } catch (error) {
      console.error('Błąd podczas rejestracji:', error);
    }
  };

  return (
    <div>
      <p><Link to="/">Strona główna</Link></p>
      <h2>Formularz rejestracji</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="Imię"
            value={formData.firstName}
            onChange={handleChange}
          />
          {formErrors.firstName && <p>{formErrors.firstName}</p>}
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Nazwisko"
            value={formData.lastName}
            onChange={handleChange}
          />
          {formErrors.lastName && <p>{formErrors.lastName}</p>}
        </div>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && <p>{formErrors.email}</p>}
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Numer telefonu"
            value={formData.phone}
            onChange={handleChange}
          />
          {formErrors.phone && <p>{formErrors.phone}</p>}
        </div>
        <div className='passwords'>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Hasło"
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && <p>{formErrors.password}</p>}
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Powtórz hasło"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}
          </div>
        </div>
        <button type="submit">Zarejestruj się</button>
      </form>
      <p>Masz już konto? <Link to="/login">Zaloguj się!</Link></p>
    </div>
  );
}

export default RegisterForm;
