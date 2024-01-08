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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Dane rejestracji:', formData);
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
