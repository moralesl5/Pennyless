const pgp = require('pg-promise')();

const db = pgp({
	host: 'localhost',
	port: 5432,
	database: 'pennyless_db',
	user: 'loganmorales' // Name of user comp
});


module.exports = db; // Exporting