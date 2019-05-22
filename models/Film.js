const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');

const FilmSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  release: {
    type: String,
    required: true
  },
  format: {
    type: String,
    enum: ['VHS', 'DVD', 'Blu-Ray'] 
  },
  starlist: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    maxlength: 300
  },
  poster: {
    type: String
  },
  last_updated: Date
}, {
  timestamps: true
});

FilmSchema.plugin(
  URLSlugs('title', {
    field: 'uid',
    indexUnique: true,
    recreate: true
  })
);

FilmSchema.set('toJSON', {
  virtuals: true
});

FilmSchema.pre('save', {query: true}, function(next) { 
    this._id = mongoose.mongo.ObjectID();
    this.last_updated = new Date();
    next();
});

const Film = mongoose.model('film', FilmSchema);
module.exports = Film;