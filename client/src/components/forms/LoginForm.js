import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FormField from './FormField';
import validateLoginForm from './validation/validateLoginForm'; 

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  if (location.state && location.state.message) {
    setMessage(location.state.message);
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };
  
  async function handleSubmit(event) {
    event.preventDefault();
    const errors = validateLoginForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
        setErrorMessage('');
        try {
            const response = await axios.post('http://localhost:3001/login', formData);

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                navigate('/');
            } else {
                setErrorMessage(response.data.message || 'Błąd logowania. Spróbuj ponownie.');
            }
        } catch (error) {
            setErrorMessage(error.response.data.message || 'Błąd serwera.');
        }
    }
  }

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
