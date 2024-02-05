import { Card, ListGroup, Button } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { fetchProductCategories } from '../api/productsApi';
import { fetchOrderProducts } from '../api/ordersApi';
import '../../../../assets/css/aa.css';

const ProductsCard = ({ orderId }) => {
    const [categories, setCategories] = useState([]);
    const [orderProducts, setOrderProducts] = useState([]);

    console.log(orderId);

    useEffect(() => {
        const getCategoriesAndProducts = async () => {
            try {
                const categoriesData = await fetchProductCategories();
                setCategories(categoriesData);
                const productsData = await fetchOrderProducts(orderId);
                setOrderProducts(productsData);
            } catch (error) {
                console.error('There was an error fetching the data:', error);
            }
        };

        getCategoriesAndProducts();
    }, [orderId]);

    const calculateCategoryTotal = (categoryId) => {
        return orderProducts
            .filter(product => product.category_id === categoryId)
            .reduce((total, product) => total + product.price, 0);
    };

    return (
        <Card className="mb-3 h-100 products-card">
            <Card.Body>
                <Card.Title>Produkty</Card.Title>
                <ListGroup>
                    {categories.map((category, index) => {
                        const productsInCategory = orderProducts.filter(product => product.category_id === category.id);
                        const categoryTotal = calculateCategoryTotal(category.id);

                        return (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                <div className="flex-grow-1">
                                    {category.category_name} (Total: {categoryTotal} zł)
                                </div>
                                {productsInCategory.length > 0 ? (
                                    productsInCategory.map(product => (
                                        <div key={product.id}>
                                            {product.name} - {product.price} zł
                                            <Button variant="outline-secondary" size="sm">Dodaj więcej</Button>
                                            <Button variant="outline-danger" size="sm">Usuń</Button>
                                        </div>
                                    ))
                                ) : (
                                    <Button variant="outline-primary" size="sm" style={{ minWidth: '120px' }}>
                                        <i className="bi bi-plus-lg"></i> Wybierz
                                    </Button>
                                )}
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

export default ProductsCard;
