/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { uploadListing, deleteListing } = require('../db/queries/items');
const { registerUser } = require('../db/queries/users');

const express = require('express');
const { application } = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

function getCurrentDate() {
  var d = new Date()
  month = '' + (d.getMonth() + 1)
  day = '' + d.getDate()
  year = d.getFullYear();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('-');
}

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
  const today = new Date();
  console.log(today);
  const itemData = {
    seller_id: req.session.user_id,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    photo: req.body.photo,
    date: getCurrentDate()
  }

  uploadListing(itemData);
  res.redirect('/');
});

router.post('/deletelisting', (req, res) => {
  const ID = req.body.listingID;
  deleteListing(ID);
  console.log(ID);
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
