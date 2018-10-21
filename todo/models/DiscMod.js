const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const baseOptions = {
  // our discriminator key, could be anything
  discriminatorKey: 'itemtype',
  // the name of our collection
  collection: 'items',
};

const Base = mongoose.model('Base', new mongoose.Schema({
  title: { type: String, required: true},
  date_added: { type: Date, required: true },
  redo: { type: Boolean, required: false },
  }, baseOptions,
));

const Book = Base.discriminator('Book', new mongoose.Schema({
    author: { type: String, required: true },
  }),
);


const Movie = Base.discriminator('Movie', new mongoose.Schema({
    director: { type: String, required: true },
  }),
);

const Tvshow = Base.discriminator('Tvshow', new mongoose.Schema({
    season: { type: Number, required: true },
  }),
);

const HobbySchema  = new Schema({
    name:  {type: String, required: true},
    todo : {type : Schema.Types.ObjectId, ref: 'items2', default:  null},
    //school: {type: String, default: null},
});

Hobby = mongoose.model('hobbies', HobbySchema);

module.exports = {Base, Book, Movie, Tvshow, Hobby}
