import { Card, ListGroup, Button } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { fetchProductCategories } from '../api/productsApi';
import { fetchOrderProducts, deleteOrderProduct } from '../api/ordersApi';
import '../../../../assets/css/aa.css';

const ProductsCard = ({ orderId }) => {
    const [categories, setCategories] = useState([]);
    const [orderProducts, setOrderProducts] = useState([]);

    useEffect(() => {
        const getCategoriesAndProducts = async () => {
            try {
                const categoriesData = await fetchProductCategories();
                setCategories(categoriesData);
                const productsData = await fetchOrderProducts(orderId);
                setOrderProducts(productsData.map(product => ({
                    ...product,
                    price: parseFloat(product.price) 
                })));
            } catch (error) {
                console.error('There was an error fetching the data:', error);
            }
        };

        getCategoriesAndProducts();
    }, [orderId]);

    const calculateTotal = () => {
        const total = orderProducts.reduce((total, product) => total + product.price, 0);
        return total.toFixed(2);
    };
      
    const calculateCategoryTotal = (categoryId) => {
        const productsInCategory = orderProducts.filter(product => product.category_id === categoryId);
        const categoryTotal = productsInCategory.reduce((total, product) => total + product.price, 0);
        return categoryTotal.toFixed(2);
    };
    
    const handleDeleteProduct = async (id) => {
        try {
          const result = await deleteOrderProduct(id);
          setOrderProducts(prevProducts => prevProducts.filter(product => product.id !== id));
          console.log(result.message); 
        } catch (error) {
          console.error('There was an error deleting the product:', error);
        }
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
                            <ListGroup.Item key={index} className="d-flex flex-column align-items-start">
                                <div className="mb-2">
                                    <strong>{category.category_name} (Total: {categoryTotal} zł)</strong>
                                </div>
                                {productsInCategory.map(product => (
                                    <div key={product.id} className="d-flex justify-content-between align-items-center w-100">
                                        {product.name} - {product.price.toFixed(2)} zł
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteProduct(product.id)}>Usuń</Button>
                                    </div>
                                ))}
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
                <div className="mt-3">
                    <strong>Cena całkowita: {calculateTotal()} zł</strong>
                </div>
            </Card.Body>
        </Card>
    )
}

export default ProductsCard;
