const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({extended: true}));
app.use('/api', require('./routes/api/films'));

app.listen(5000, 'localhost', () => console.log('Сервер запущен!'));