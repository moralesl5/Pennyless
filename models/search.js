const db = require('../db/config');

const create = (place, userId) =>{
	return db.one(`INSERT INTO places(user_id, lat, long, name, cat, note)
	VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`, [userId, place.lat, place.long, place.name, place.cat, place.note]);
};



module.exports = {create};
