const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const saltRounds = 10;
const cors = require('cors');
const app = express();
const router = express.Router(); 
const port = 3001;

const Pool = require('pg').Pool;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const SECRET_KEY = process.env.SECRET_KEY;

app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json());
app.use(router);

router.post('/addUser', (req, res) => {
    const { firstname, lastname, email, phone, password, role } = req.body;
  
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

    // Znajdź użytkownika w bazie danych
    const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userQuery.rows.length === 0) {
        return res.status(401).send({ message: 'Nieprawidłowy email lub hasło' });
    }

    const user = userQuery.rows[0];

    // Sprawdź, czy hasło jest poprawne
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).send({ message: 'Nieprawidłowy email lub hasło' });
    }

    // Ustaw czas wygaśnięcia tokena
    const expiresIn = rememberMe ? '14d' : '1h'; 

    // Generuj token JWT
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


app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
