const pool = require('../../database');

async function registerOrder(req, res) {
    const { userId, answers, additionalComments } = req.body;
    try{
        pool.query('INSERT INTO orders (user_id, status, details, additional_comments) VALUES ($1, $2, $3, $4)',
        [userId, 'pending', answers, additionalComments], (insertErr, results) => {
            if (insertErr) {
                throw insertErr;
            }
            res.status(201).send('Przyjęto twoje zamówienie!');
        })
    } catch (error) { 
        res.status(500).send('Błąd serwera');
    }
    
};

async function getOrderProducts(req, res) {
    const orderId = req.query.orderId;
    const query = `
      SELECT order_products.id AS id, products.id AS product_id, products.name AS name, products.price AS price, category_id
      FROM order_products
      INNER JOIN products ON order_products.product_id = products.id
      WHERE order_products.order_id = $1;
    `;

    try {
        const { rows } = await pool.query(query, [orderId]);
        if (rows.length === 0) {
            return res.status(404).send({ message: 'To zamówienie na razie nie posiada żadnych produktów.' });
        }
        res.json(rows);
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send({ message: 'Błąd serwera' });
    }
}

async function changeOrderStatus(req, res) { 
    const orderId = req.query.orderId;
    const status = req.query.status;
    try{
        const result = await pool.query('UPDATE orders SET status = $1 WHERE id = $2', [status, orderId]);
        if (result.rowCount === 0){
            res.status(404).send({ message: 'Nie znaleziono zamówienia o podanym id' })
        }
        res.send({ message: "Zmieniono status zamówienia"})
    } catch (error) {
        res.status(500).send({ message: "Wystąpił błąd podczas aktualizacji statusu zamówienia" })
    }
}

async function getOrderData(req, res) {
    const id = req.query.orderId;
    try{
        const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
        if (result.rowCount === 0){
            res.status(404).send({ message: 'Nie znaleziono zamówienia o podanym id' })
        }
        res.json(result.rows);
    } catch (error) {
        res.status(500).send({ message: "Wystąpił błąd." })
    }
}

async function deleteOrderProduct(req, res) {
    const id = req.query.id; 
    try {
        const result = await pool.query('DELETE FROM order_products WHERE id = $1', [id]);
        if (result.rowCount === 0){
            res.status(404).send({ message: 'Nie znaleziono produktu o podanym id' });
        } else {
            res.status(200).send({ message: 'Produkt został usunięty' });
        }
    } catch (error) {
        res.status(500).send({ message: "Wystąpił błąd podczas usuwania produktu." });
    }
}


module.exports = {
    registerOrder,
    changeOrderStatus,
    getOrderProducts,
    getOrderData,
    deleteOrderProduct,
};