import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import LatestOrders from './LatestOrders';
import Earnings from './Earnings';
import UserManagement from './UserManagement/UserManagement';
import ProductsManagement from './ProductsManagement';
import UserManagementForm from './UserManagement/UserManagementForm';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedUser, setSelectedUser] = useState(null);

  const renderContent = () => {
    switch(activeTab) {
      case 'orders':
        return <LatestOrders />;
      case 'earnings':
        return <Earnings />;
      case 'user-management':
        return <UserManagement setActiveTab={setActiveTab} setSelectedUser={setSelectedUser} />;
      case 'products-management':
        return <ProductsManagement />
      case 'user-management-form':
        return <UserManagementForm setActiveTab={setActiveTab} user={selectedUser} />
      default:
        return <Earnings />;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3} lg={2} className="d-none d-md-block bg-light sidebar">
          <Nav className="flex-column">
            <Nav.Link onClick={() => setActiveTab('orders')}>Zamówienia</Nav.Link>
            <Nav.Link onClick={() => setActiveTab('earnings')}>Zarobki</Nav.Link>
            <Nav.Link onClick={() => setActiveTab('user-management')}>Zarządzanie Użytkownikami</Nav.Link>
            <Nav.Link onClick={() => setActiveTab('products-management')}>Zarządzanie Produktami</Nav.Link>
          </Nav>
        </Col>

        <Col xs={12} className="d-md-none">
          <Navbar expand="lg" className="bg-light">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link onClick={() => setActiveTab('orders')}>Zamówienia</Nav.Link>
                <Nav.Link onClick={() => setActiveTab('earnings')}>Zarobki</Nav.Link>
                <Nav.Link onClick={() => setActiveTab('user-management')}>Zarządzanie Użytkownikami</Nav.Link>
                <Nav.Link onClick={() => setActiveTab('products-management')}>Zarządzanie Produktami</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>

        <Col xs={12} md={9} lg={10}>
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
