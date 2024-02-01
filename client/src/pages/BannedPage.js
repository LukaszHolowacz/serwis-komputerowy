import React from 'react';
import { useNavigate } from 'react-router-dom';

function BannedPage() {
  const navigate = useNavigate();

  return (
    <div className="container text-center" style={{ paddingTop: '100px' }}>
      <h1>Konto Zablokowane</h1>
      <p className="mb-4">Twoje konto zostało zablokowane z powodu stanowczego naruszenia zasad naszej strony.</p>
      <p className="mb-4">Jeśli uważasz, że jest to błąd lub chcesz omówić warunki przywrócenia dostępu do konta, skontaktuj się z naszym wsparciem.</p>
      <a href="mailto:support@example.com" className="mb-4 d-block">support@example.com</a>
      <button onClick={() => navigate('/')} className="btn btn-primary">Powrót do strony głównej</button>
    </div>
  );
}

export default BannedPage;
