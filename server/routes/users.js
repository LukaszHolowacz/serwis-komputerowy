const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../database');
const router = express.Router();

const saltRounds = 10;
const SECRET_KEY = process.env.SECRET_KEY;

router.post('/addUser', (req, res) => {
    const { firstName: firstname, lastName: lastname, email, phone, password, role } = req.body;
  
    const userRole = role === 'admin' ? 'admin' : 'user';
  
    pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
        if (err) {
            return res.status(500).send('Wystąpił problem z weryfikacją użytkownika.');
        }
    
        if (result.rows.length > 0) {
            return res.status(409).send('Konto z podanym adresem E-mail już istnieje.');
        }
    
        bcrypt.hash(password, saltRounds, (hashErr, hash) => {
            if (hashErr) {
                return res.status(500).send('Wystąpił problem z hashowaniem hasła. Spróbuj ponownie później.');
            }

            pool.query('INSERT INTO users (role, name, surname, email, phone_nbr, password, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
                    [userRole, firstname, lastname, email, phone, hash, new Date()], (insertErr, results) => {
                if (insertErr) {
                    throw insertErr;
                }
                res.status(201).send('Pomyślnie dodano użytkownika!');
            });
        });
    });
});

router.post('/login', async (req, res) => {
    const { email, password, rememberMe } = req.body; 

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

    const token = jwt.sign(
        { 
          userId: user.id,
          name: user.name,     
          lastName: user.lastName, 
          email: user.email, 
        },
        SECRET_KEY,
        { expiresIn: expiresIn }
      );
  
      res.send({ token });
});

router.get('/search', async (req, res) => {
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
        // Nie wymaga dodawania dodatkowych parametrów, więc nie inkrementujemy queryIndex
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
        // Możesz dodać więcej opcji sortowania w zależności od potrzeb
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
});

router.put('/update-user', async (req, res) => {
    const { id, name: firstName, surname: lastName, role, email, phone_nbr: phoneNumber } = req.body;
  
    const checkEmailQuery = `
        SELECT 1 FROM users WHERE email = $1 AND id != $2
    `;

    try {
        const checkEmailResult = await pool.query(checkEmailQuery, [email, id]);
        if (checkEmailResult.rows.length > 0) {
            return res.status(400).send({ success: false, message: 'Użytkownik z podanym adresem email już istnieje.' });
        }

        const updateQuery = `
            UPDATE users
            SET 
                name = $1,
                surname = $2,
                role = $3,
                email = $4,
                phone_nbr = $5
            WHERE id = $6
        `;

        const updateResult = await pool.query(updateQuery, [firstName, lastName, role, email, phoneNumber, id]);
        if (updateResult.rowCount > 0) {
            res.send({ success: true, message: 'Dane użytkownika zaktualizowane.' });
        } else {
            res.send({ success: false, message: 'Nie znaleziono użytkownika o podanym ID.' });
        }
    } catch (err) {
        console.error('Błąd aktualizacji użytkownika', err.stack);
        res.status(500).send({ success: false, message: 'Wystąpił błąd podczas aktualizacji danych użytkownika.' });
    }
});

router.put('/ban-user', async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).send({ message: "ID użytkownika jest wymagane." });
    }

    try {
        const result = await pool.query('UPDATE users SET is_banned = TRUE WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).send({ message: "Nie znaleziono użytkownika o podanym id w bazie danych!" });
        }

        res.send({ message: "Konto użytkownika zostało zablokowane." });
    } catch (error) {
        res.status(500).send({ message: "Wystąpił błąd podczas blokowania konta użytkownika." });
    }
});

router.put('/unban-user', async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).send({ message: "ID użytkownika jest wymagane." });
    }

    try {
        const result = await pool.query('UPDATE users SET is_banned = FALSE WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).send({ message: "Nie znaleziono użytkownika o podanym id w bazie danych!" });
        }

        res.send({ message: "Konto użytkownika zostało zablokowane." });
    } catch (error) {
        res.status(500).send({ message: "Wystąpił błąd podczas blokowania konta użytkownika." });
    }
});

module.exports = router;