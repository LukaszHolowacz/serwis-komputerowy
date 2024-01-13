import React from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function HomePage() {
  // Dekodowanie tokenu JWT
  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;

  // Funkcja do wylogowania
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload(); // Odświeżenie strony
  };

  return (
    <div>
      <h1>Strona główna</h1>
      {user ? <p>Witaj {user.name}!</p> : null}
      {user ? (
        <button onClick={handleLogout}>Wyloguj się</button>
      ) : (
        <>
          <Link to="/login">
            <button>Zaloguj się</button>
          </Link>
          <Link to="/register">
            <button>Zarejestruj się</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default HomePage;
