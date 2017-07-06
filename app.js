var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var glob = require('glob');
var index = require('./routes/index');
var mainpage = require('./routes/mainpage');
var girls = require('./routes/girls');
var mans = require('./routes/manescorts');
var gays = require('./routes/gays');
var lesby = require('./routes/lesbys');
var emailSender = require('./routes/emailsender');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/anotherpageforadmin', index);
app.use('/', mainpage);
app.use('/actions', mainpage);
app.use('/womenescorts', girls);
app.use('/manescorts', mans);
app.use('/recruit', emailSender);
app.use('/gayesorts', gays);
app.use('/lesbyescorts', lesby);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.redirect('/')
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err);
    res.redirect('/')
});
module.exports = app;
