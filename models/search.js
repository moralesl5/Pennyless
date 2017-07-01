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
	return db.one(`INSERT INTO places(user_id, lat, long, name, cat, note)
	VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`, [userId, place.lat, place.long, place.name, place.cat, place.notes]);
};




module.exports = {create, getPlaceId};
