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
        }
        )
    } catch (error) { 
        res.status(500).send('Błąd serwera');
    }
    
};

module.exports = {
    registerOrder
};