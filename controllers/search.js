const router = require('express').Router();
const search = require('../models/search');
const axios = require('axios')

const resultsObj = {};


// Show
router.get('/', (req, res) => {
    // console.log("info from search", req.body)

    res.render('ux/show');
});

// NEW PLACE
router.get('/new', (req, res) => {
    res.render('ux/new')
})


//Show
router.get(`/results`, (req, res) => {
    console.log('bitches', resultsObj)
    res.render('ux/results', { resultsObj });
})


router.get('/results/:id/edit', (req, res) => {
    let resData;

    search
        .findById(req.params.id)
        .then((place) => {
            resData = place;
            res.render('ux/edit', resData);
        })
        .catch((err) => {
            console.log('Place Edit Error', err);
        });
})




router.get(`/:catPlace`, (req, res) => {
    console.log('info from search', req.params.catPlace)

    search
        .catSearch(req.params.catPlace)
        .then((data) => {
            resultsObj.data = data;
            console.log("HEY LOGAN HERES YOUR DATA", resultsObj.data);
            res.render('ux/results', { resultsObj });
        })





})

router.get('/results/:id', (req, res) => {
        console.log('heres the id', req.params.id)
        search
            .findById(req.params.id)
            .then((one) => {
                console.log('ID:', req.params.id)
                res.render('ux/one', one)
                console.log(one)
            })
            .catch((err) => {
                console.log('Error showing one', err);
            });
    })
    // router.get(`/results`, (req,res) =>{
    // 	res.render('ux/results');
    // })







// Adding a new item
router.post('/', (req, res) => {
    const responseData = {};
    console.log('Data:', req.body);
    console.log('User:', req.user.id);
    search
        .getPlaceId(req.body.address)
        .then((latlong) => {
            console.log("Data from API!!", latlong.data.results[0])
            console.log("Lat: ", latlong.data.results[0].geometry.location.lat);
            console.log("Long:", latlong.data.results[0].geometry.location.lng);
            responseData.lat = latlong.data.results[0].geometry.location.lat;
            responseData.long = latlong.data.results[0].geometry.location.lng;
            req.body.lat = latlong.data.results[0].geometry.location.lat;
            req.body.long = latlong.data.results[0].geometry.location.lng;
            console.log("this is the response data", responseData);
            return search.create(req.user.id, req.body)
        })
        .then(place => {
            console.log('INSIDE OF POST', place);
            responseData.id = place.id;
            responseData.user_id = place.user_id;
            responseData.name = place.name;
            responseData.cat = place.cat;
            responseData.note = place.note;
            console.log("HERE IS YOUR DATA LOGAN", responseData)
            console.log("Trying to convert in controller")

            res.json(responseData);


        })
        .catch(err => console.log('ERROR IN CONTROLLER', err))

})

router.put('/results/:id/edit', (req, res) => {
    console.log("information in edit!", req.body);
    console.log('user id in edit!', req.user.id);
    search
        .update(req.body, req.params.id, req.user.id)
        .then((data) => {
        	console.log('THEN', data);
            res.json(data)
        })
        .catch((error) => {
            console.log('Error in updating from controller', error);
        });
})

router.delete('/results/:id', (req, res) =>{
	search
		.destroy(req.params.id, req.user.id)
		.then((place) =>{
			res.send('deleted')
		})
		.catch(err => console.log("Error deleting from controller", err));
})


module.exports = router;
