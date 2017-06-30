const router = require('express').Router();
const search = require('../models/search');

router.get('/', (req, res) => {
    res.render('ux/show');
});


// NEW PLACE
router.get('/new', (req,res) =>{
	res.render('ux/new')
})

router.post('/', (req,res) =>{

	console.log('Data:', req.body);
	console.log('User:', req.user.id);
	search
		.create(req.user.id, req.body.lat, req.body.long, req.body.name, req.body.cat, req.body.note)
		.then((place) =>{
			console.log('INSIDE OF POST', place);
			res.json({place});
		})
	    .catch(err => console.log('ERROR IN CONTROLLER', err))

})

module.exports = router;