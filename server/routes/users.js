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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).send({ message: 'Nieprawidłowy email lub hasło' });
    }

    const expiresIn = rememberMe ? '62d' : '1h'; 

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

module.exports = router;
