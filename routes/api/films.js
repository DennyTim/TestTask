const express = require('express');
const multer  = require('multer');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
const { check, validationResult } = require('express-validator/check');

const router = express.Router();
let upload = multer();
fetch.Promise = Bluebird;
//Require models
const Film = require('../../models/Film');

const reqImg = async (title, done) => {
  try {
    const res = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=c991574d`);
    const body = await res.json();
    done(null, body);
  } catch (error) {
    console.error(error.message);
    done(error, null);
  }
}

router.get('/films', async (req, res) => {
  try {
    const films = await Film.find({}).sort({ title: 1});
    res.json(films);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.get('/films/:id', async (req, res) => {
  const film = await Film.findOne({uid: req.params.id});
  res.status(200).json(film);
});

router.get('/enum', async(req, res) => {
  const result = Film.schema.path('format').enumValues;
  res.status(200).json(result);
});

router.post('/import', upload.any(), async (req, res) => {
    if(!req.files[0]) {
      return res.status(400).json('File not founded')
    }
    if(req.files[0].size > 5242880) {
      return res.status(400).json('Maximum size is 5mb')
    }
    let extension = req.files[0].originalname.match(/\.[0-9a-z]+$/i)[0].toLowerCase();
    if(extension !== '.txt'){
      return res.status(400).json('Incorrect file')
    }
    let data = req.files[0].buffer.toString('utf8');
    //parse document
    const arr = data.split('\n\n').reduce((acc, item) => {
      let obj = {};
      item.split('\n').map(el => {
        if(el) return obj[`${el.split(/:/)[0].toLowerCase()}`] = el.split(/:/)[1];
      });
      return [...acc, obj];
    },[]).filter(value => Object.keys(value).length !== 0)
  
  //Save films
  try {
    let acc = arr.map((item) => {
      const film = {};
      if(item.title) film.title = item.title.trim();
      if(item.format) film.format = item.format.trim();
      if(item['release year']) film.release = (item['release year']).trim();
      if (item.stars) film.starlist = item.stars.split(',').map(star => star.trim());
      film.poster = 'https://via.placeholder.com/170x250/000000/FFFFFF/?text=NOPHOTO';
      return film;
    });
    await Film.insertMany(acc);
    return res.status(200).json({msg: 'ok'});
  } catch (error) {
    const { name, message } = error;
    return res.status(500).json({ name, message});
  }
})

router.post('/films', [
    check('title', 'Title is required').not().isEmpty(),
    check('format').isIn(['VHS', 'DVD', 'Blu-Ray']),
    check('release', 'Release incorrect')
      .isLength({ min: 4, max: 4 })
      .custom(release => release > 1895 && release < 2020),
    check('stars', 'Starlist is required').not().isEmpty(),
    check('description', 'Description must should have less 300 characters ').isLength({ max: 300 })
  ], async (req, res) => {
  try {  
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }

    const {title, format, release, stars, description} = req.body;
    const film = {};
    if (title) film.title = title;
    if (format) film.format = format;
    if (stars) {
      film.starlist = stars.split(',').map(star => star.trim());
    }
    if(description) film.description = description;
    reqImg(title, async (err, data) => {
      if(err || data.Poster === 'N/A') {
        if (release) film.release = release;
        film.poster = 'https://via.placeholder.com/170x250/000000/FFFFFF/?text=NOPHOTO';
        const newFilm = new Film(film);
        const result = await newFilm.save();
        return res.json(result);
      }

      if (data.Poster) film.poster = data.Poster;
      if (data.Year) film.release = data.Year;
      const newFilm = new Film(film);
      const result = await newFilm.save();
      return res.json(result);
    });
  } catch (error) {
    const { name, message } = error;
    return res.status(500).json({ name, message});
  }
});

router.delete('/films/:id', async(req, res) => {
  try {
    const film = await Film.findOne({uid: req.params.id});
    await film.remove();
    res.status(200).json({ msg: 'Film removed'});
  } catch (error) {
    const { name, message } = error;
    res.status(404).json({ name, message});
  }
});

module.exports = router;