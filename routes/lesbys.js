var express = require('express');
var app = express.Router();
var glob = require('glob');
var fs = require("fs");

var getPaths = function (src, callback) {
    glob(src + '/**/*', callback);
};

var id= 0;
var counter = 0;
var getNumber = function () {
    id = JSON.parse(fs.readFileSync("Jsonaux/ID_handler.json")).IDLESBY;
};

var fullpaths =""; var profiles = "test";
var name= [] ,sex = [],description= [],age= [],language  = [] , height=[],boost=[],nationality=[],haircolor = [],price1 = [], price2 = [], price3 = [], price4 = [] , idcurent = [];
var photosource = [], photosourceaux = [], skipped = [];
var totalprofiles = 0;
var rendered = false;
var lastloaded = 0;
app.get('/', function(req, res, next) {

    getNumber();
    var albumpaths = "";
    getPaths("JsonalbumLesby", function (err, _res) {
        if (err) {
            console.log(err);
        }
        albumpaths = JSON.parse(JSON.stringify(_res));
    });
    getPaths("JsonLesby", function (err, _res) {
        if (err) {
            console.log(err);
        }
        fullpaths = JSON.stringify(_res);
        profiles = JSON.parse(fullpaths);

        for (var i = lastloaded; i < id - 1; i++) {
            totalprofiles++;
            skipped[i] = 0;
            var document = fs.readFileSync(JSON.stringify(profiles[i]).replace('"', '').replace('"', ''));
            // ------------------------------
            var albumdoc = fs.readFileSync(JSON.stringify(albumpaths[i]).replace('"', '').replace('"', ''));
            var newfile = JSON.parse(albumdoc);
            console.log(newfile.photos.length);
            for (var j = 1; j < newfile.photos.length; j++) {
                try {
                    var getalbum = JSON.stringify(newfile.photos[j]).replace('[', '').replace(']', '');
                    var setalbum = JSON.parse(getalbum);
                    photosourceaux.push('/photos/' + setalbum['originalname']);
                }
                catch (err) {

                }
            }
            photosource.push(photosourceaux);
            name.push(JSON.stringify(JSON.parse(document)["Name"]));
            sex.push(JSON.stringify(JSON.parse(document)["Sex"]));
            description.push(JSON.stringify(JSON.parse(document)["Description"]));
            age.push(JSON.stringify(JSON.parse(document)["Age"]));
            language.push(JSON.stringify(JSON.parse(document)["Language"]));
            height.push(JSON.stringify(JSON.parse(document)["Height"]));
            boost.push(JSON.stringify(JSON.parse(document)["Bra Size"]));
            nationality.push(JSON.stringify(JSON.parse(document)["Nation"]));
            haircolor.push(JSON.stringify(JSON.parse(document)["Hair Color"]));
            price1.push(JSON.stringify(JSON.parse(document)["Price1"]));
            price2.push(JSON.stringify(JSON.parse(document)["Price2"]));
            price3.push(JSON.stringify(JSON.parse(document)["Price3"]));
            price4.push(JSON.stringify(JSON.parse(document)["Price4"]));
            idcurent.push(i);
        }
    });
    lastloaded = totalprofiles;
    if(photosource.length < 1 && counter < 2)
    {
        counter++;
        res.redirect('lesbyescorts');
    }
    res.render('lesbys', {
        photo_source_: photosource,
        name_: name,
        sex_: sex,
        description_: description,
        age_: age,
        language_: language,
        height_: height,
        boost_: boost,
        nationality_: nationality,
        hair_: haircolor,
        price1_: price1,
        price2_: price2,
        price3_: price3,
        price4_: price4,
        escorts_number: id - 1,
        skipprofiles: skipped,
        profilesnumber: totalprofiles
    })
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
