const pool = require('../../database');

async function getProductsCategories(req, res) {
    try {
        const { rows } = await pool.query('SELECT * FROM product_categories');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

module.exports = {
    getProductsCategories,
}