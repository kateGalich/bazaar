/*
 * All routes for Items are defined here
 * Since this file is loaded in server.js into /items,
 *   these routes are mounted onto /items
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { getUser, getCurrentUser } = require('../db/queries/users');
const { getItems, getItem } = require('../db/queries/items');

const express = require('express');
const { application } = require('express');
const { registerUser, loginUser, uploadListing } = require('./database');
const bcrypt = require('bcryptjs');
const router = express.Router();

// get home page
router.get('/', (req, res) => {
  getCurrentUser(req)
    .then(user => {
      getItems(req.query)
        .then(items => {
          const viewData = {
            user: user,
            items: items,
            query: req.query
          };
          res.render('index', viewData);
        });
    });
});

//view one item
router.get('/view/:id', (req, res) => {
  // let viewData
  // fetchMessages(req.params.id).then(result => {
  //   getItem(req.params.id).then(item => {
  //     viewData = {
  //       messages: result,
  //       user: req.session.user_id,
  //       item: item
  //     };
  //     if (viewData.user == viewData.messages[0].seller_id) {
  //       viewData.isSeller = true;
  //     } else {
  //       viewData.isSeller = false;
  //     }
  //     console.log(viewData);
  //     res.render('item', viewData);
  //   })
  // });
  getCurrentUser(req)
    .then(user => {
      getItem(req.params.id)
        .then(item => {
          const viewData = {
            user: user,
            item: item
          };
          res.render('item', viewData);
        });
    });
});

// create new item
router.get('/newlisting', (req, res) => {
  console.log('============================================== 1');
  getCurrentUser(req)
    .then(user => {
  console.log('============================================== 2');
      const viewData = {
        user: user,
      };
      res.render('postlisting', viewData);
    });
});

function getCurrentDate() {
  var d = new Date();
  month = '' + (d.getMonth() + 1);
  day = '' + d.getDate();
  year = d.getFullYear();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('-');
}

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
  };

  uploadListing(itemData);
  res.redirect('/');
});


module.exports = router;
