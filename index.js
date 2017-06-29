require('dotenv').config();

const express = require('express'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      // passport = require('passport'),
      mustacheExpress = require('mustache-express'),
      port = process.env.PORT || 3000, // Will run on 8080 as delcared and enforced by your holiness: .env
      app = express(),
      silly = require('sillyname'),
      user = require('./controllers/users'),
      cookieParser = require('cookie-parser');






//Setting up server stuff
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// Important: mount express middleware BEFORE passport middleware
app.use(session({
	secret: process.env.SECRET_KEY,
	resave: true,
	saveUninitialized: true
}));

// ==============================================================
// PASSPORT STUFF
// const passport = require('passport');
const auth = require('./services/auth.js');
app.use(auth.passportInstance);
app.use(auth.passportSession);

// END OF PASSPORT STUFF
// ==============================================================

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/user', require('./controllers/users'));
app.use('/search', auth.restrict, require('./controllers/search'));


const username = silly();
console.log(username);

app.listen(port, () =>{
	console.log(`The world runs on ${port}`);
})

app.get('/', (req,res) =>{
	console.log('Test index rendering');
	res.render('index');
})
