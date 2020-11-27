const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Router = require('./routes/apiroutes.js');
const session = require('express-session');
const passport = require('passport');
const root = require('./');
const MongoStore = require('connect-mongo')(session);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/rendezvous_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
  
    });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

//sessions
app.use(session(
    {  
        secret: 'waggle-fraggle', //pick a random string to make the hash that is generated secure
        store: new MongoStore({ mongooseConnection: connection }),
        resave: false, //required
        saveUninitialized: false //required
    })
)

// app.use( (req, res, next) => {  console.log('req.session', req.session);  next()});
  
//passport
app.use(passport.initialize());
app.use(passport.session()) // calls serializeUser and deserializeUser

// routes
app.use(Router);




app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});