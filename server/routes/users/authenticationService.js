const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../database');
const SECRET_KEY = process.env.SECRET_KEY;

async function loginUser(req, res) {
    const { email, password, rememberMe } = req.body;

    try {
        const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userQuery.rows.length === 0) {
            return res.status(401).send({ message: 'Nieprawidłowy email lub hasło' });
        }

        const user = userQuery.rows[0];
        if (user.is_banned) {
            return res.status(403).send({ message: 'To konto użytkownika jest zablokowane.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Nieprawidłowy email lub hasło' });
        }

        const expiresIn = rememberMe ? '30d' : '1h';
        const token = jwt.sign({ userId: user.id, name: user.name, lastName: user.lastName, email: user.email }, SECRET_KEY, { expiresIn: expiresIn });
        res.send({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Wystąpił problem podczas logowania.');
    }
}

module.exports = {
    loginUser,
};
