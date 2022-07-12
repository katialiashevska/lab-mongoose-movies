const mongoose = require("mongoose");
const Celebrity = require("../models/celebrity");
const Movie = require("../models/movie");

const DB_NAME = 'celebrity-dev';

 mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
   useCreateIndex: true,
   useNewUrlParser: true,
   useUnifiedTopology: true
 });

/* 
const celebs = [
    {
        name: "Troye Sivan",
        occupation: "Singer",
        catchPhrase: "none",
    },
    {
        name: "Hayley Kiyoko",
        occupation: "Singer",
        catchPhrase: "none",
    },
    {
        name: "Laverne Cox",
        occupation: "Actress",
        catchPhrase: "none",
    },
];

Celebrity.create(celebs)
  .then(celebsFromDB => {
    console.log(`Created ${celebsFromDB.length} celebs`);
    mongoose.connection.close();
  })
  .catch(err => console.log("An error occured while creating celebs from the DB", err));
*/

const movies = [
  {
      title: "Gattaca",
      genre: "dystopian science fiction thriller",
      plot: "A biopunk vision of a future society driven by eugenics where potential children are conceived through genetic selection to ensure they possess the best hereditary traits of their parents.",
  },
  {
      title: "Don't Look Up",
      genre: "apocalyptic comedy",
      plot: "A story of two astronomers attempting to warn humanity about an approaching comet that will destroy human civilization.",
  },
  {
      title: "The Lobster",
      genre: "black comedy dystopia",
      plot: "A world in which single people are given 45 days to find romantic partners or otherwise be turned into animals.",
  },
];

Movie.create(movies)
.then(moviesFromDB => {
  console.log(`Created ${moviesFromDB.length} movies`);
  mongoose.connection.close();
})
.catch(err => console.log("An error occured while creating movies from the DB", err));
