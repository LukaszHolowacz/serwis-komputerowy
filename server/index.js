const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const app = express();
const router = express.Router(); // Tworzenie routera
const port = 3001;

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'shop',
  password: 'Lholowacz5',
  port: 5432,
});

app.use(cors()); // Użyj CORS przed routerem
app.use(express.json());
app.use(router);

router.post('/api/addUser', (req, res) => {
    const { firstname, lastname, email, phone, password, role } = req.body;
  
    // Sprawdzanie, czy email i hasło nie są puste
    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }
  
    // Sprawdzanie, czy rola jest prawidłowa
    const userRole = role === 'admin' ? 'admin' : 'user';
  
    // Sprawdzanie, czy email już istnieje
    pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
        if (err) {
            return res.status(500).send('Error checking user.');
        }
    
        if (result.rows.length > 0) {
            return res.status(409).send('Email already exists.');
        }
    
        // Hashowanie hasła
        bcrypt.hash(password, saltRounds, (hashErr, hash) => {
            if (hashErr) {
            return res.status(500).send('Error hashing password.');
            }
    
            // Wykonanie zapytania do bazy danych z zahashowanym hasłem
            pool.query('INSERT INTO users (role, name, surname, email, phone_nbr, password, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
                    [userRole, firstname, lastname, email, phone, hash, new Date()], (insertErr, results) => {
            if (insertErr) {
                throw insertErr;
            }
            res.status(201).send(`Pomyślnie dodano użytkownika!`);
            });
        });
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
