import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from './FormField';
import validateLoginForm from './validation/validateLoginForm'; 

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateLoginForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setErrorMessage('');
      try {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
  
        if (response.status === 401) {
          const errorResponse = await response.text();
          setErrorMessage(errorResponse);
          return;
        }
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Błąd logowania. Spróbuj ponownie.');
        }
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token); 
          navigate('/'); 
        }
  
        const data = await response.json();
        console.log('Login successful:', data);
        // Obsłuż zalogowanie użytkownika (np. przechowaj token, przekieruj itp.)
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  const formFields = [
    { type: 'text', name: 'email', placeholder: 'E-mail' },
    { type: 'password', name: 'password', placeholder: 'Hasło' }
  ];

  return (
    <div>
      <p><Link to="/">Strona główna</Link></p>
      <h2>Formularz logowania</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
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
        <label>
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          Zapamiętaj mnie
        </label>
        <button type="submit">Zaloguj się</button>
      </form>
      <p>Nie masz jeszcze konta? <Link to="/register">Zarejestruj się</Link></p>
    </div>
  );
}

export default LoginForm;
