require('dotenv').config();

const express = require('express'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      passport = require('passport'),
      mustacheExpress = require('mustache-express'),
      port = process.env.PORT || 3000, // Will run on 8080 as delcared and enforced by your holiness: .env
      app = express(),
      silly = require('sillyname'),
      user = require('./controllers/users'),
      cookieParser = require('cookie-parser');

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// PASSPORT STUFF
const auth = require('./services/auth.js');
app.use(auth.passportInstance);
app.use(auth.passportSession);

app.use('/user', user);
// END OF PASSPORT STUFF



//Setting up server stuff
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

const username = silly();
console.log(username);

app.listen(port, () =>{
	console.log(`The world runs on ${port}`);
})

app.get('/', (req,res) =>{
	console.log('Test index rendering');
	res.render('index');
})
