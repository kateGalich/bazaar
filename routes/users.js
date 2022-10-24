/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { application } = require('express');
const { registerUser } = require('./database');
const bcrypt = require ('bcryptjs');
const router  = express.Router();

router.post('/register', (req, res) => {
  const newUser = {
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password),
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address
  };
  const user = registerUser(newUser);

  req.session.user = user.id;
  res.redirect("/");
});

module.exports = router;
