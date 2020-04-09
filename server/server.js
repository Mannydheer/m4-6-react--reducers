const express = require('express');
const morgan = require('morgan')

const PORT = 5678;

var app = express();

//all middleware below this. 

app.use(express.json());
app.use(morgan('tiny'))
//use morgan dev

app.use(require('./routes'));

const server = app.listen(PORT, function() {
  console.info('🌍 Listening on port ' + server.address().port);
});
