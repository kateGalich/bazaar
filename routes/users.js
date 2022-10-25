/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { getItems } = require('../db/queries/items');
let getCurrentUser = function (req) {
  //return { email: "test@email.com" }
  return null;
};

const express = require('express');
const { application } = require('express');
const { registerUser, loginUser, uploadListing } = require('./database');
const bcrypt = require('bcryptjs');
const router = express.Router();

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

router.post('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  console.log(req.session.user_id);
  loginUser(req.session.user_id);
  res.redirect('/');
});

router.post('/newlisting', (req, res) => {
  const itemData = {
    seller_id: req.session.user_id,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,

  }

  uploadListing(itemData);
  res.redirect('/');
})

// router.post('/login', (req, res) => {
//   const logUser = {
//     email: req.body.email,
//     password: req.body.password
//   };
//   loginUser(logUser)
//   .then((user) => {
//     console.log(user);
//     if (!user || !bcrypt.compareSync(logUser.password, user.password)) {
//       res.send('Email or Password is incorrect');
//       return;
//     }
//     res.redirect("/");
//   })
//   .catch(err => console.log(err));
// });

module.exports = router;
