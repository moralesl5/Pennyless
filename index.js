require('dotenv').config();

const express = require('express'),
      logger = require('morgan'),
      mustacheExpress = require('mustache-express'),
      port = process.env.PORT || 3000, // Will run on 8080 as delcared and enforced by your holiness: .env
      app = express();

//Setting up server stuff
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.listen(port, () =>{
	console.log(`The world runs on ${port}`);
})

app.get('/', (req,res) =>{
	console.log('Test index rendering');
	res.send('It\'s grind time');
})