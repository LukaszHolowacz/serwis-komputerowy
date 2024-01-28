const express = require('express');
const pool = require('../database');
const router = express.Router();

router.post('/pc-form-register', (req, res) => {
    const { userId, answers, additionalComments } = req.body;

    pool.query('INSERT INTO orders (user_id, status, details, additional_comments) VALUES ($1, $2, $3, $4)',
        [userId, 'pending', answers, additionalComments], (insertErr, results) => {
            if (insertErr) {
                throw insertErr;
            }
            res.status(201).send('Przyjęto twoje zamówienie!');
        }
    )
})

module.exports = router;
