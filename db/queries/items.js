const db = require('../connection');

const getItems = (query) => {
  let sql = 'SELECT * FROM items WHERE 1=1 ';
  let values = [];
  if (query.title) {
    values.push("%" + query.title.toLowerCase() + "%");
    sql += `AND lower(title) LIKE $${values.length}`;

  }
  if (query.minimum_price) {
    values.push(query.minimum_price);
    sql += `AND price >= $${values.length}`;
  }
  if (query.maximum_price) {
    values.push(query.maximum_price);
    sql += `AND price <= $${values.length}`;
  }
  sql += ';';
  return db
    .query(sql, values)
    .then((data) => data.rows);
};

const getItem = (itemId) => {
  let sql = 'SELECT * FROM items WHERE id=$1;';
  let values = [itemId];
  return db.query(sql, values)
    .then(data => {
      return data.rows[0];
    });
};

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

const deleteListing = function(listing) {

}
exports.deleteListing = deleteListing;

module.exports = {
  getItems: getItems,
  getItem: getItem
};
