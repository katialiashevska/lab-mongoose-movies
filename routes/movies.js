const express = require("express");
const router = express.Router();

const Movie = require("../models/movie");

router.get("/movies", (req, res, next) => {
    Movie.find()
      .then(moviesFromDB => {
        res.render("movies/index", { Movies: moviesFromDB });
      })
      .catch(err => {
        console.log("Error while retrieving movies from DB", err);
        next(err);
      });
});

router.get("/movies/new", (req, res, next) => {
    res.render("movies/new");
});
  
router.post("/movies/new", (req, res, next) => {
  const { title, genre, plot } = req.body;
  Movie.create({ title, genre, plot })
    .then(() => res.redirect("/movies"))
    .catch(() => res.render("movies/new"));
});

router.get("/movies/:id", (req, res, next) => {
    const { id } = req.params;
    Movie.findById(id)
      .then(theMovie => {
          res.render("movies/show", { movie: theMovie });
      })
      .catch(err => {
          console.log("Error while retrieving movie details", err);
          next(err);
      });
});

router.get("/movies/:id/edit", (req, res, next) => {
    const { id } = req.params;
    Movie.findById(id)
      .then(movieToEdit => {
        res.render("movies/edit", { movie: movieToEdit });
      })
      .catch(err => {
        console.log("Error while editing the movie", err);
        next(err);
      });
  });
  
  router.post("/movies/:id/edit", (req, res, next) => {
    const { id } = req.params;
    const { title, genre, plot } = req.body;
    Movie.findByIdAndUpdate(id, { title, genre, plot }, { new: true })
      .then(() => res.redirect("/movies"))
      .catch(err => {
        console.log("Error while editing the movie", err);
        next(err);
      });
  });

  router.post("/movies/:id/delete", (req, res, next) => {
    const { id } = req.params;
    Movie.findByIdAndRemove(id)
      .then(() => res.redirect("/movies"))
      .catch(err => {
        console.log("Error while deleting the movie", err);
        next(err);
      });
  });

module.exports = router;