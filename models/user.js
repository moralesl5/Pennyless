const bcrypt = require('bcryptjs');
const silly = require('sillyname');
const db = require('../db/config');

// const User = {};

function create (user) {
  const password = bcrypt.hashSync(user.password, 10);
  const username = silly();
  return db.oneOrNone(`
    INSERT INTO users
    (email, username, password_digest)
    VALUES
    ($1, $2, $3)
    RETURNING *;`,
    [ user.email, username, password]
  );
};

function findByEmail (email) {
  return db.oneOrNone(`
    SELECT *
    FROM users
    WHERE email = $1;`,
    [email]
  );
};


module.exports = { create, findByEmail};