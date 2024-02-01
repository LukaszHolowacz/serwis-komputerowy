const pool = require('../../database');

async function orderSearch(req, res) {
    const searchQuery = req.query.search;
    const sortOrder = req.query.sortOrder || 'date_desc'; 
    const status = req.query.status;

    let queryParams = [];
    let queryConditions = [];
    let query = `
        SELECT orders.*, users.email AS user_email, users.phone_nbr AS user_phone FROM orders 
        INNER JOIN users ON orders.user_id = users.id
    `;

    if (searchQuery) {
        queryParams.push(`%${searchQuery}%`);
        queryConditions.push('(orders.id::text LIKE $1 OR users.email LIKE $1 OR users.phone_nbr LIKE $1)');
    }

    if (status) {
        queryParams.push(status);
        const statusConditionIndex = queryParams.length;
        queryConditions.push(`orders.status = $${statusConditionIndex}`);
    }

    if (queryConditions.length > 0) {
        query += ' WHERE ' + queryConditions.join(' AND ');
    }

    switch (sortOrder) {
        case 'date_asc':
            query += ' ORDER BY orders.order_date ASC';
            break;
        case 'date_desc':
            query += ' ORDER BY orders.order_date DESC';
            break;
        case 'id_asc':
            query += ' ORDER BY orders.id ASC';
            break;
        case 'id_desc':
            query += ' ORDER BY orders.id DESC';
            break;
    }

    try {
        const result = await pool.query(query, queryParams);
        if (result.rows.length === 0) {
            return res.status(404).send('Nie znaleziono zamówień.');
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Wystąpił problem z bazą danych.');
    }
};

module.exports = {
    orderSearch
};