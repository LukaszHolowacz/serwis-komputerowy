const express = require('express');
const pool = require('../database');
const router = express.Router();

router.post('/pc-form-register', (req, res) => {
    const { userId, answers, additionalComments } = req.body;
    try{
        pool.query('INSERT INTO orders (user_id, status, details, additional_comments) VALUES ($1, $2, $3, $4)',
        [userId, 'pending', answers, additionalComments], (insertErr, results) => {
            if (insertErr) {
                throw insertErr;
            }
            res.status(201).send('Przyjęto twoje zamówienie!');
        }
        )
    } catch (error) { 
        res.status(500).send('Błąd serwera');
    }
    
})

router.get('/search', async (req, res) => {
    const searchQuery = req.query.search;

    if (!searchQuery) {
        return res.status(400).send('Wymagane jest podanie kryterium wyszukiwania');
    }

    const query = `
        SELECT orders.*, users.email AS user_email, users.phone_nbr AS user_phone FROM orders 
        INNER JOIN users ON orders.user_id = users.id
        WHERE orders.id::text LIKE $1 
        OR users.email LIKE $1 
        OR users.phone_nbr LIKE $1
    `;

    try {
        const result = await pool.query(query, [`%${searchQuery}%`]);
        if (result.rows.length === 0) {
            return res.status(404).send('Nie znaleziono zamówień.');
        }
        res.json(result.rows);
    } catch (err) {
        res.status(500).send('Wystąpił problem z bazą danych.');
    }
});




module.exports = router;
