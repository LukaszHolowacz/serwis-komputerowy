import React from 'react';
import { Card } from 'react-bootstrap';
import { formatDate } from '../../../../utils/dateFormatter';

const UserDataCard = ({ isLoading, error, userData }) => (
  <Card className="mb-3 h-100">
    <Card.Body>
      <Card.Title className='mb-3'>Dane użytkownika</Card.Title>
      {isLoading ? (
        <p>Ładowanie danych użytkownika...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : userData ? (
        <>
          <p><strong>ID:</strong> {userData.id}</p>
          <p><strong>Imię i nazwisko:</strong> {`${userData.name} ${userData.surname}`}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Nr telefonu:</strong> {userData.phone_nbr}</p>
          <p><strong>Data założenia konta:</strong> {formatDate(userData.created_at)}</p>
        </>
      ) : (
        <p>Nie znaleziono danych użytkownika.</p>
      )}
    </Card.Body>
  </Card>
);

export default UserDataCard;
