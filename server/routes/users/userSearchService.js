const pool = require('../../database');

async function searchUsers(req, res) {
    const { search, sortOrder = 'id_asc', filter } = req.query;

    let queryParams = [];
    let queryConditions = [];
    let queryIndex = 1;
    let query = `
        SELECT id, role, name, surname, email, phone_nbr, created_at, is_banned FROM users
    `;

    if (search) {
        queryParams.push(`%${search}%`);
        queryConditions.push(`(id::text LIKE $${queryIndex} OR email LIKE $${queryIndex} OR phone_nbr LIKE $${queryIndex})`);
        queryIndex++;
    }

    if (filter) {
        if (filter === 'banned') {
            queryConditions.push(`is_banned = TRUE`);
        } else if (filter === 'unbanned') {
            queryConditions.push(`is_banned = FALSE`);
        }
    }

    if (queryConditions.length > 0) {
        query += ' WHERE ' + queryConditions.join(' AND ');
    }

    switch (sortOrder) {
        case 'id_asc':
            query += ' ORDER BY id ASC';
            break;
        case 'id_desc':
            query += ' ORDER BY id DESC';
            break;
    }

    try {
        const result = await pool.query(query, queryParams);
        if (result.rows.length === 0) {
            return res.status(404).send('Nie znaleziono użytkowników.');
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Wystąpił problem z bazą danych.');
    }
};


module.exports = { searchUsers };