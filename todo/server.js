const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const MongoDB = require('./openMongo');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const reload = require('reload')

var filewatcher = require('filewatcher');
var watcher = filewatcher();



var logger = function(req, res, next) {
  console.log("GOT REQUEST !");
  next();
}

const app = express();

MongoDB.open('dev');


app.use(cors());
app.use(bodyParser.json());
// app.use(logger);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.use(express.static('public'));

reloadServer = reload(app);
watcher.add(__dirname + '/public');
watcher.on('change', function(file, stat) {
  reloadServer.reload();
});

app.listen(5000, () => {
    console.log('now listening for requests on port 5000');
});
