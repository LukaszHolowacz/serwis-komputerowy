import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import { PencilSquare, Trash, LockFill, UnlockFill } from 'react-bootstrap-icons';
import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';

function formatDate(dateString) {
  const parsedDate = parseISO(dateString);
  return format(parsedDate, "d MMMM yyyy HH:mm", { locale: pl });
}

function UserManagement({ setActiveTab, setSelectedUser }) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('id_asc');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/search?search=${searchQuery}&sortOrder=${sortOrder}&filter=${filter}`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, [searchQuery, sortOrder, filter]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setActiveTab('user-management-form');
  };

  const handleToggleBan = async (user) => {
    if(window.confirm(`Czy na pewno chcesz ${user.is_banned ? 'odblokować' : 'zablokować'} tego użytkownika?`)) {
      try {
        await axios.put(`http://localhost:3001/users/${user.is_banned ? 'unban' : 'ban'}-user`, { id: user.id });
        setUsers(users.map(u => u.id === user.id ? { ...u, is_banned: !u.is_banned } : u));
      } catch (error) {
        console.error('Error updating user status: ', error);
      }
    }
  };

  return (
    <div>
      <h2>Zarządzanie Użytkownikami</h2>

      <Row className="mb-3">
        <Col>
          <input 
            className='form-control'
            type="text" 
            placeholder="Szukaj..." 
            value={searchQuery} 
            onChange={handleSearchChange}
          />
        </Col>
        <Col xs="auto">
          <Form.Select onChange={handleSortChange} defaultValue="id_asc">
            <option value="id_desc">ID malejąco</option>
            <option value="id_asc">ID rosnąco</option> 
          </Form.Select>
        </Col>
        <Col xs="auto">
          <Form.Select onChange={handleFilterChange} defaultValue="all">
            <option value="all">Blokada konta</option>
            <option value="banned">Wyświetlaj tylko zablokowanych</option>
            <option value="unbanned">Wyświetlaj tylko odblokowanych</option>
          </Form.Select>
        </Col>
      </Row>
      <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Data Założenia Konta</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.phone_nbr}</td>
                <td>{formatDate(user.created_at)}</td>
                <td>
                  <Button variant="outline-primary" onClick={() => handleEditClick(user)}>
                    <PencilSquare />
                    <span className="d-none d-md-inline"> Edytuj</span>
                  </Button>
                  <Button variant={user.is_banned ? "outline-success" : "outline-secondary"} onClick={() => handleToggleBan(user)}>
                    {user.is_banned ? <UnlockFill /> : <LockFill />}
                    <span className="d-none d-md-inline"> {user.is_banned ? ' Odblokuj' : ' Zablokuj'}</span>
                  </Button>{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default UserManagement;
