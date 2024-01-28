import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import LatestOrders from './LatestOrders';
import Earnings from './Earnings';
import UserManagement from './UserManagement';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('latest-orders');

  const renderContent = () => {
    switch(activeTab) {
      case 'latest-orders':
        return <LatestOrders />;
      case 'earnings':
        return <Earnings />;
      case 'user-management':
        return <UserManagement />;
      default:
        return <Earnings />;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3} lg={2} className="d-none d-md-block bg-light sidebar">
          <Nav className="flex-column">
            <Nav.Link onClick={() => setActiveTab('latest-orders')}>Ostatnie Zamówienia</Nav.Link>
            <Nav.Link onClick={() => setActiveTab('earnings')}>Zarobki</Nav.Link>
            <Nav.Link onClick={() => setActiveTab('user-management')}>Zarządzanie Użytkownikami</Nav.Link>
          </Nav>
        </Col>

        <Col xs={12} className="d-md-none">
          <Navbar expand="lg" className="bg-light">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link onClick={() => setActiveTab('latest-orders')}>Ostatnie Zamówienia</Nav.Link>
                <Nav.Link onClick={() => setActiveTab('earnings')}>Zarobki</Nav.Link>
                <Nav.Link onClick={() => setActiveTab('user-management')}>Zarządzanie Użytkownikami</Nav.Link>
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
