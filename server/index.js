const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/users/users');
const orderRoutes = require('./routes/orders/orders');
const productRoutes = require('./routes/products/products')

const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

module.exports = app;
