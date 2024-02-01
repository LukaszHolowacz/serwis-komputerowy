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

async function changeOrderStatus(req, res) { 
    const orderId = req.query.orderId;
    const status = req.query.status;
    try{
        const result = await pool.query('UPDATE orders SET status = $1 WHERE id = $2', [status, orderId]) 
        if (result.rowCount === 0){
            res.status(404).send({ message: 'Nie znaleziono zamówienia o podanym id' })
        }
        res.send({ message: "Zmieniono status zamówienia"})
    } catch (error) {
        res.status(500).send({ message: "Wystąpił błąd podczas aktualizacji statusu zamówienia" })
    }
}

module.exports = {
    registerOrder,
    changeOrderStatus,
};