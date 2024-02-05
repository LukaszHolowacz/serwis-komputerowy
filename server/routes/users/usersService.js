const bcrypt = require('bcrypt');
const pool = require('../../database');
const saltRounds = 10;

async function addUser(req, res) {
    const { firstName, lastName, email, phone, password, role } = req.body;
    const userRole = role === 'admin' ? 'admin' : 'user';

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            return res.status(409).send('Konto z podanym adresem E-mail już istnieje.');
        }

        const hash = await bcrypt.hash(password, saltRounds);
        await pool.query('INSERT INTO users (role, name, surname, email, phone_nbr, password, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)', [userRole, firstName, lastName, email, phone, hash, new Date()]);
        res.status(201).send('Pomyślnie dodano użytkownika!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Wystąpił problem z bazą danych.');
    }
}

async function updateUser(req, res) {
    const { id, name, surname, role, email, phone_nbr } = req.body;
    try {
        const checkEmailResult = await pool.query('SELECT 1 FROM users WHERE email = $1 AND id != $2', [email, id]);
        if (checkEmailResult.rows.length > 0) {
            return res.status(400).send({ success: false, message: 'Użytkownik z podanym adresem email już istnieje.' });
        }

        await pool.query('UPDATE users SET name = $1, surname = $2, role = $3, email = $4, phone_nbr = $5 WHERE id = $6', [name, surname, role, email, phone_nbr, id]);
        res.send({ success: true, message: 'Dane użytkownika zaktualizowane.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Wystąpił błąd podczas aktualizacji danych użytkownika.' });
    }
}

async function banUser(req, res) {
    const { id } = req.body;
    try {
        const result = await pool.query('UPDATE users SET is_banned = TRUE WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send({ message: "Nie znaleziono użytkownika o podanym id!" });
        }
        res.send({ message: "Konto użytkownika zostało zablokowane." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Wystąpił błąd podczas blokowania konta użytkownika." });
    }
}

async function unbanUser(req, res) {
    const { id } = req.body;
    try {
        const result = await pool.query('UPDATE users SET is_banned = FALSE WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send({ message: "Nie znaleziono użytkownika o podanym id!" });
        }
        res.send({ message: "Konto użytkownika zostało odblokowane." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Wystąpił błąd podczas odblokowywania konta użytkownika." });
    }
}

async function getUserData(req, res) {
    const id = req.query.userId;
    try {
        const result = await pool.query('SELECT id, name, surname, email, phone_nbr, created_at FROM users WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send({ message: "Nie znaleziono użytkownika o podanym id!" });
        }
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Wystąpił błąd."})
    }
}

module.exports = {
    addUser,
    updateUser,
    banUser,
    unbanUser,
    getUserData,
};