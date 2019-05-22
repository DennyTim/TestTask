const express = require('express');
const connectDB = require('./config/db');
const request = require('request');

//Require models
const Film = require('./models/Film');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
 
const reqImg = (title, done) => {
  try {
    const options = {
      uri: `http://www.omdbapi.com/?t=${title}&apikey=c991574d`,
      method: 'GET',
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if(response.statusCode !== 200) {
        done(response.statusCode, null)
      }

      done(null, JSON.parse(body).Poster);
    });

  } catch (error) {
    console.error(error.message);
  }
}


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
  res.status(200).json(film);
});

app.post('/api/films', async (req, res) => {
  const {title, release, format, stars, description} = req.body;
  const film = {};
  if(title) film.title = title;
  if(release) film.release = release;
  if(format) film.format = format;
  if (stars) {
    film.starlist = stars.split(',').map(star => star.trim());
  }
  if(description) film.description = description;

  try {  
    reqImg(title, async (err, data) => {
      if(err) throw err;

      if (data) film.poster = data;
      const newFilm = new Film(film);
      const result = await newFilm.save();
      return res.json(result);
    });

  } catch (error) {
    const { name, message } = error;
    res.status(404).json({ name, message});
  }
});

app.delete('/api/films/:id', async(req, res) => {
  const film = await Film.findById(req.params.id);
  await film.remove();
  res.json({ msg: 'Film removed'});
});

app.listen(5000, 'localhost', () => console.log('Сервер запущен!'));