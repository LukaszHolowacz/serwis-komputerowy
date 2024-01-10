import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Strona główna</h1>
      <Link to="/login">
        <button>Zaloguj się</button>
      </Link>
      <Link to="/register">
        <button>Zarejestruj się</button>
      </Link>
    </div>
  );
}

export default HomePage;