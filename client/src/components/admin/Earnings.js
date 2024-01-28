import React, { useState, useEffect } from 'react';

function MonthlyEarnings() {
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    // Wywołanie API do pobrania miesięcznych zarobków
    // Przykładowe dane
    setEarnings(2000);
  }, []);

  return (
    <div>
      <h2>Zarobki</h2>
      <p>{earnings} zł</p>
    </div>
  );
}

export default MonthlyEarnings;
