var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser=require("body-parser");
var router = express.Router();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminsRouter = require('./routes/admins');

require('dotenv').config()

var app = express();
const oidc = new ExpressOIDC({
  issuer: process.env.OIDC_ISSUER,
  client_id: process.env.OIDC_CLIENT_ID,
  client_secret: process.env.OIDC_CLIENT_SECRET,
  appBaseUrl: process.env.BASE_URL,
  loginRedirectUri: `${process.env.BASE_URL}/callback`,
  scope: 'openid profile',
  routes: {
    loginCallback: {
      path: '/callback'
    },
  }
});
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));
app.use(oidc.router);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admins', adminsRouter);

router.post("localhost:3000/results", async function(req, res){

  //List all users
  let a = JSON.stringify(req.body);
  console.log(a);
  console.log(req.body.createuserfirstname);
  //console.log(a.contains());
  if (a.includes('createuserbutton')) { //Create a user
    await createUserFunc(req.body.createuserfirstname, req.body.createuserfirstname,
      req.body.createuseremail, req.body.createuserpassword);
    res.send(create);
    console.log(req);
  }  else if (a.includes('deleteuserbutton')) {
      const user = client.getUser(req.body.deleteuser)
        .then(user => {
          console.log(user);
        })
        .catch(err => {
          const e = err;
          console.error(err);
        });
      user.deactivate()
        .then(() => console.log('User has been deactivated'))
        .then(() => user.delete())
        .then(() => console.log('User has been deleted'));
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
