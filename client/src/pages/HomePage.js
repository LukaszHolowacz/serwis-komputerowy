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
    <div className="container mt-5">
      <h1>Strona główna</h1>
      {user ? <p>Witaj {user.name}!</p> : null}
      {user ? (
        <>
          <button className="btn btn-danger m-1" onClick={handleLogout}>Wyloguj się</button>
          <Link to="/computer-config">
            <button className="btn btn-primary m-1">Konfiguracja Komputera</button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">
            <button className="btn btn-success m-1">Zaloguj się</button>
          </Link>
          <Link to="/register">
            <button className="btn btn-info m-1">Zarejestruj się</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default HomePage;
