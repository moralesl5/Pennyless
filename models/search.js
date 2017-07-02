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




module.exports = {create, getPlaceId};
