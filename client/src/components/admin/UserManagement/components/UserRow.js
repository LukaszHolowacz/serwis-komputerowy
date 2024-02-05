import React from 'react';
import { Button } from 'react-bootstrap';
import { PencilSquare, Trash, LockFill, UnlockFill } from 'react-bootstrap-icons';
import { formatDate } from '../../../../utils/dateFormatter';

function UserRow({ user, onEditClick, onToggleBan }) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{user.phone_nbr}</td>
      <td>{formatDate(user.created_at)}</td>
      <td>
        <Button variant="outline-primary" onClick={() => onEditClick(user)}>
          <PencilSquare />
          <span className="d-none d-md-inline"> Edytuj</span>
        </Button>
        <Button variant={user.is_banned ? "outline-success" : "outline-secondary"} onClick={() => onToggleBan(user)}>
          {user.is_banned ? <UnlockFill /> : <LockFill />}
          <span className="d-none d-md-inline"> {user.is_banned ? ' Odblokuj' : ' Zablokuj'}</span>
        </Button>{' '}
      </td>
    </tr>
  );
}

export default UserRow;
