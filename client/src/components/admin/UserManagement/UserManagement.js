import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import UserRow from './components/UserRow';
import UserFilters from './components/UserFilters';
import { fetchUsers, toggleUserBanStatus } from './api/usersApi';

function UserManagement({ setActiveTab, setSelectedUser }) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('id_asc');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUsers(searchQuery, sortOrder, filter);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setUsers([]);
      }
    };
    fetchData();
  }, [searchQuery, sortOrder, filter]);

  return (
    <div>
      <h2>Zarządzanie Użytkownikami</h2>
      <UserFilters
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        sortOrder={sortOrder}
        onSortChange={(e) => setSortOrder(e.target.value)}
        filter={filter}
        onFilterChange={(e) => setFilter(e.target.value)}
      />
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
              <UserRow
                key={user.id}
                user={user}
                onEditClick={() => {
                  setSelectedUser(user);
                  setActiveTab('user-management-form');
                }}
                onToggleBan={async () => {
                  const action = user.is_banned ? 'unban' : 'ban';
                  if(window.confirm(`Czy na pewno chcesz ${user.is_banned ? 'odblokować' : 'zablokować'} tego użytkownika?`)) {
                    try {
                      await toggleUserBanStatus(user.id, action);
                      setUsers(users.map(u => u.id === user.id ? { ...u, is_banned: !u.is_banned } : u));
                    } catch (error) {
                      console.error('Error updating user status: ', error);
                    }
                  }
                }}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default UserManagement;
