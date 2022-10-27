const { Pool } = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const registerUser = function(user) {
  const userInfo = [`${user.name}`, `${user.password}`, `${user.email}`, `${user.phone}`, `${user.address}`];

  return pool
    .query(`
    INSERT INTO users (name, password, email, phone, address)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `, userInfo)
    .then((result) => {
      console.log(result.rows[0]);
      return Promise.resolve(result.rows[0])
    })
    .catch ((err) => {
      console.log(err);
    })
};
exports.registerUser = registerUser;

const loginUser = function(user) {
  const userInfo = [`${user}`];

  return pool
    .query(`
    SELECT * FROM users
    WHERE id = $1
    `, userInfo)
    .then((result) => {
      console.log(result.rows[0]);
      return Promise.resolve(result.rows[0]);
    })
    .catch((err) => {
      console.log(err);
    })
};
exports.loginUser = loginUser;

const uploadListing = function(listing) {
  // console.log(listing);
  const listingInfo = [`${listing.seller_id}`, `${listing.title}`, `${listing.price}`, `${listing.description}`, `${listing.photo}`, `${listing.date}`];

  return pool
    .query(`
    INSERT INTO items (seller_id, title, price, description, photo, created)
    VALUES ($1, $2, $3, $4, $5, $6)
    `, listingInfo)
    .then((result) => {
      console.log(result.rows[0]);
      return Promise.resolve(result.rows[0]);
    })
    .catch((err) => {
      console.log('error');
      console.log(err);
    })
};
exports.uploadListing = uploadListing;

const fetchMessages = function(messages) {
  const itemInfo = [`${messages}`];

  return pool
    .query(`
      SELECT *
      FROM messages
      LEFT JOIN items ON item_id = items.id
      WHERE items.id = $1
      ORDER BY messages.created
    `, itemInfo)
    .then((result) => {
      return Promise.resolve(result.rows);
    })
    .catch((err) => {
      console.log(err);
    })
};
exports.fetchMessages = fetchMessages;
