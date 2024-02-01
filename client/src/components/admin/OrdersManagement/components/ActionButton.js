import React from 'react';
import { Button } from 'react-bootstrap';
import { PencilSquare, XCircle } from 'react-bootstrap-icons';

export const EditButton = ({ onClick }) => (
  <Button variant="outline-primary" onClick={onClick}>
    <PencilSquare />
    <span className="d-none d-md-inline"> Edytuj</span>
  </Button>
);

export const CancelButton = ({ onClick }) => (
  <Button variant="outline-danger" onClick={onClick}>
    <XCircle />
    <span className="d-none d-md-inline"> Anuluj</span>
  </Button>
);
