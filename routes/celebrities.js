const express = require("express");
const router = express.Router();

const Celebrity = require("../models/celebrity");

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
      .then(celebsFromDB => {
        res.render("celebrities/index", { Celebs: celebsFromDB });
      })
      .catch(err => {
        console.log("Error while retrieving celebrities from DB", err);
        next(err);
      });
});

router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new");
});

router.post("/celebrities/new", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch(() => res.render("celebrities/new"));
});

router.get("/celebrities/:id", (req, res, next) => {
    const { id } = req.params;
    Celebrity.findById(id)
      .then(theCeleb => {
          res.render("celebrities/show", { celeb: theCeleb });
      })
      .catch(err => {
          console.log("Error while retrieving celebrity details", err);
          next(err);
      });
});

router.get("/celebrities/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then(celebToEdit => {
      res.render("celebrities/edit", { celeb: celebToEdit });
    })
    .catch(err => {
      console.log("Error while editing the celebrity", err);
      next(err);
    });
});

router.post("/celebrities/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase }, { new: true })
    .then(() => res.redirect("/celebrities"))
    .catch(err => {
      console.log("Error while editing the celebrity", err);
      next(err);
    });
});

router.post("/celebrities/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Celebrity.findByIdAndRemove(id)
    .then(() => res.redirect("/celebrities"))
    .catch(err => {
      console.log("Error while deleting the celebrity", err);
      next(err);
    });
});

module.exports = router;