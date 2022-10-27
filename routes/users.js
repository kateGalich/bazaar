/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { getUser, getCurrentUser, getUserByEmail } = require('../db/queries/users');

const express = require('express');
const { application } = require('express');
const { registerUser, loginUser, uploadListing } = require('./database');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Show error page to user
const renderError = function(req, res, message, statusCode = 400) {
  getCurrentUser(req)
    .then(user => {
      const viewData = {
        user: user,
        message: message
      };
      res.status(statusCode);
      res.render("error", viewData);
    });
};


router.post('/register', (req, res) => {
  const newUser = {
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password),
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address
  };
  registerUser(newUser);
  res.redirect("/");
});

router.get('/register', (req, res) => {
  getCurrentUser(req)
    .then(user => {
      const viewData = {
        user: user
      };
      res.render('register', viewData);
    });
});

router.get('/login', (req, res) => {
  getCurrentUser(req)
    .then(user => {
      const viewData = {
        user: user
      };
      res.render('login', viewData);
    });
});

router.post("/login", (req, res) => {
  getUserByEmail(req.body.email)
    .then(user => {

      if (!user) {
        renderError(req, res, 'Username and password not matched!', 401);
        return;
      } else if (!bcrypt.compareSync(req.body.password, user.password)) {
        renderError(req, res, 'Username and password not matched!', 401);
        return;
      }
      req.session.user_id = user.id;
      res.redirect('/');
    });
});

router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
