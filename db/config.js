const pgp = require('pg-promise')();

const db = pgp(process.env.DATABASE_URL || 
	'postgres://loganmorales@localhost:5432/pennyless_db');




module.exports = db; // Exporting