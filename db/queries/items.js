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

module.exports = {
  getItems: getItems
};
