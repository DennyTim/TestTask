const express = require('express');
const connectDB = require('./config/db');

//Require models
const Film = require('./models/Film');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/films', async (req, res) => {
  try {
    const films = await Film.find({}).sort({ title: 1});
    res.json(films);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/films/:id', async (req, res) => {
  const film = await Film.findById(req.params.id);
  res.json(film);
});

app.post('/api/films', async (req, res) => {
  const {title, release, format, stars} = req.body;

  const film = {};

  if(title) film.title = title;
  if(release) film.release = release;
  if(format) film.format = format;
  if (stars) {
    film.starlist = stars.split(',').map(star => star.trim());
  }

  const newFilm = new Film(film);
  const result = await newFilm.save();
  res.json(result);
});

app.delete('/api/films/:id', async(req, res) => {
  const film = await Film.findById(req.params.id);
  await film.remove();
  res.json({ msg: 'Film removed'});
});

app.listen(5000, 'localhost', () => console.log('Сервер запущен!'));