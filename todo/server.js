const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const MongoDB = require('./openMongo');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const reload = require('reload')

const util = require('util');

const TodoAppUser = require('./todo_src/TodoAppUser')

var filewatcher = require('filewatcher');
var watcher = filewatcher();

//---------passport
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken')
const { Strategy, ExtractJwt } = passportJWT

const SECRET='hello123';
const params = {
  secretOrKey: 'hello123',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}
const strategy = new Strategy(params, async(payload, done) => {
  const user = await TodoAppUser.findById(user => user.id === payload.id) || null
  console.log("hello1")
  return done(null, user)
})
passport.use(strategy)
///passport.initialize()
//-------------


var logger = function(req, res, next) {
  console.log("GOT REQUEST !");
  next();
}

const app = express();

MongoDB.open('dev');


app.use(cors());
app.use(bodyParser.json());
// app.use(logger);

//-------passport auth
app.use('/graphql', (req, res, next) => {
  // console.log("req: " + util.inspect(req, null, 4))
  passport.use(strategy)
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    console.log("hello2")
    console.log(err)
    //console.log(user)
    console.log(info)
    if (user) {
      req.user = user
      console.log("hello3")
    }
    next()
  })(req, res, next)
})

app.use('/graphql', graphqlHTTP( (req)=>({
  schema,
  graphiql: true,
  context: ({ req }) => ({
    user: req.user
  })
})));

app.use(express.static('public'));

reloadServer = reload(app);
watcher.add(__dirname + '/public');
watcher.on('change', function(file, stat) {
  reloadServer.reload();
});

app.listen(5000, () => {
    console.log('now listening for requests on port 5000');
});
