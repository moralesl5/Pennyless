const db = require('../db/config');
const axios = require('axios');

const getPlaceId = (address) => {
        const results = axios({
            url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${address}&key=${process.env.GOOGLE_API_KEY}`,
            method: 'GET'
        })

        return results;
    }



const create = (userId, place) =>{
	console.log("HEY LOGAN THIS IS THE INFORMATION YOU WANTED FROM YOUR MODEL!!!", userId, place)
	return db.one(`INSERT INTO places(user_id, lat, long, address, name, cat, note)
	VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`, [userId, place.lat, place.long, place.address, place.name, place.cat, place.notes]);
};

const catSearch = (cat) =>{
	return db.manyOrNone(`SELECT * FROM places WHERE cat = $1`, [cat]);
}

const findById = (id) =>{
	return db.one(`SELECT * FROM places WHERE id = $1`, [id]);
}

const update = (place, placeId, userId) =>{
	return db.one(`UPDATE places SET name = $1, cat = $2, note = $3 WHERE id = $4 AND user_id = $5 RETURNING id`, [place.name, place.cat, place.note, placeId, userId]);
}

const destroy = (placeId, userId) =>{
	return db.none(`DELETE FROM places WHERE id = $1 AND user_id = $2`, [placeId, userId]);
}




module.exports = {create, getPlaceId, catSearch, findById, update, destroy};
