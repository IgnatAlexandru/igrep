var express = require('express');
var app = express.Router();
var multer = require('multer');
var crypto = require("crypto");
const bunyan = require('bunyan');

const storage = multer.diskStorage({
    destination: 'public/temp/',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err);
            cb(null, file.originalname)
        })
    }
});
const upload = multer({storage: storage});

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


var mailAccountUser = 'igescortslondon@gmail.com';
var mailAccountPassword = 'Igescorts22';

var fromEmailAddress = 'igescortslondon@gmail.com';
var toEmailAddress ='igescortslondon@gmail.com';



app.get('/', function (req,res,next) {
    console.log('aici');
    res.render('emailsend');
});

app.post('/sendmail', upload.any(), function (req,res,next) {
    var text2 = JSON.stringify(req.files).replace('[','').replace(']','');

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: igescortslondon@gmail.com
            pass:  Igescorts22
        },
        logger: bunyan.createLogger({
            name: 'nodemailer'
        }),
        debug: true // include SMTP traffic in the logs
    }, {
        // default message fields

        // sender info
        from: 'Pangalink <no-reply@pangalink.net>',
        headers: {
            'X-Laziness-level': 1000 // just an example header, no need to use this
        }
    });

    console.log('SMTP Configured');

// Message object
    let message = {

        // Comma separated list of recipients
        to: 'gagiu.filip@Gmail.com',

        // Subject of the message
        subject: 'A new person wants to be recruited',

        // plaintext body
        text: JSON.stringify(req.body),


        // Apple Watch specific HTML body

        // An array of attachments
        attachments:
            [
                {filename: JSON.stringify(JSON.parse(text2)["originalname"]),
                 path: './public/temp/'+JSON.stringify(JSON.parse(text2)["originalname"]).replace('"','').replace('"',''),
                    cid: 'nyan@example.com'}
    ]};
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');
        console.log('Server responded with "%s"', info.response);
        transporter.close();
        res.redirect('/recruit');
    });
    res.redirect('/recruit');
});

app.post('/home', function (req,res,next) {
   res.redirect('');
});

app.post('/faq', function (req,res,next) {
   res.redirect('/FAQ')
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


module.exports = app;