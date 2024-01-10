import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Wysłano:', { email, password });
  };

  return (
    <div>
      <p><Link to="/">Strona główna</Link></p>
      <h2>Formularz logowania</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <p><Link to="/">Zapomniałeś hasła?</Link></p>
        </div>
        <button type="submit">Zaloguj się</button>
      </form>
      <p>Nie masz jeszcze konta? <Link to="/register">Zarejestruj się</Link></p>
    </div>
  );
}

export default LoginForm;
