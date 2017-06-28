const pgp = require('pg-promise')({});

const cn = {
	host: 'localhost',
	port: 5432,
	database: 'pennyless_db',
	user: 'loganmorales' // Name of user comp
};

const db = pgp(cn); // Link pg promise to postgreSQL

module.exports = db; // Exporting