if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('./auth');
const session = require('express-session');

const indexRouter = require('./routes/index');
const testsRouter = require('./routes/tests');
const usersRouter = require('./routes/users');
const lobbyRouter = require('./routes/authenticated/lobby');
const gamesRouter = require('./routes/authenticated/games');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    store: new (require('connect-pg-simple')(session))(),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure:
        process.env.ENVIRONMENT !== 'development' &&
        process.env.ENVIRONMENT !== 'test',
      maxAge: 2419200000
    }
  })
);

// Initialize Passport session
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tests', testsRouter);
app.use('/lobby', lobbyRouter);
app.use('/games', gamesRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(_request, _response, next) {
  next(createError(404));
});

// error handler
app.use((err, request, response) => {
  // set locals, only providing error in development
  response.locals.message = err.message;
  response.locals.error = request.app.get('env') === 'development' ? err : {};

  // render the error page
  response.status(err.status || 500);
  response.render('error');
});

module.exports = app;
