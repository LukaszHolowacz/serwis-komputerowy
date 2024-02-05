import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { fetchUserData } from './api/ordersApi'; 
import '../../../assets/css/aa.css'
import UserDataCard from './components/UserDataCard';
import OrderDataCard from './components/OrderDataCard';
import OrderDetailsCard from './components/OrderDetailsCard';
import CostsTableCard from './components/CostsTableCard';
import DiscountCodeForm from './components/DiscountCodeForm';
import ChangeStatusButtons from './components/ChangeStatusButtons';
import ProductsCard from './components/ProductsCard';

const EditOrderPage = ({ order, setActiveTab }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData(order.user_id);
        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Wystąpił błąd podczas pobierania danych użytkownika:', error);
        setError('Nie udało się pobrać danych użytkownika.');
        setIsLoading(false);
      }
    };

    getUserData();
  }, [order.user_id]); 

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col xs={12} className="d-flex justify-content-between">
          <Button variant="outline-primary" onClick={() => setActiveTab('orders')} className="mr-2 mb-3 mt-3">
            Wstecz
          </Button>
          <h2 className='mr-2 mb-3 mt-3'>Zarządzanie zamówieniem nr. {order.id}</h2>
        </Col>
      </Row>
      <Row className="flex-column flex-md-row">
        <Col md={5} lg={4}>
          <ProductsCard orderId={order.id}/>
        </Col>
        <Col md={7} lg={8}>
          <Row>
            <Col className="mb-3" md={6} lg={6}>
              <UserDataCard isLoading={isLoading} error={error} userData={userData}/>
            </Col>
            <Col className="mb-3" md={6} lg={6}>
              <OrderDataCard order={order} />
            </Col>
            <Col md={7} lg={7}>
              <OrderDetailsCard orderDetails={order.details} />
            </Col>
            <Col md={7} lg={5}>
              <CostsTableCard />
              <DiscountCodeForm />
              <ChangeStatusButtons />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default EditOrderPage;
