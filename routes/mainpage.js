var express = require('express');
var app = express.Router();
var glob = require('glob');
var fs = require("fs");

app.get("/", function (req,res,next) {
   res.render('mainpage');
});



app.post('/FAQ', function (req,res,next) {
   res.render('terms');
});

app.post('/recruitment', function (req,res,next) {
   res.redirect('/recruit');
});

app.post('/lesbyescorts', function (req,res,next) {
    res.redirect('/lesbyescorts');
});

app.post('/womenescorts', function (req,res,next) {
    res.redirect('/womenescorts');
});

app.post('/manescorts', function (req,res,next) {
    res.redirect('/manescorts');
});

app.post('/gayescorts', function (req,res,next) {
    res.redirect('/gayesorts');
});

app.post('/test', function (req,res,next) {
    res.redirect('/gayesorts');
});

app.post('/FAQ/recruit', function (req,res,next) {
   res.redirect('/recruit');
});

module.exports = app;
