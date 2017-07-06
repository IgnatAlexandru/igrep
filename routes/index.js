const express = require('express');
const app = express.Router();
const multer = require('multer');
const crypto = require("crypto");
const path = require("path");
const glob = require('glob');
var os = require('os');
var type = 0;

const fs = require('fs');
const sub_path ='public/upload/' ;

const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err);
            cb(null, file.originalname)
        })
    }
});


const albumStorage = multer.diskStorage({
    destination: 'public/photos/',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err);
            cb(null, file.originalname)
        })
    }
});

const upload = multer({storage: storage});
const albumUpload = multer({storage:albumStorage});

const writeJson = function (src, raw) {
    const idfile = fs.readFileSync("Jsonaux/ID_handler.json");
    const idwriter = fs.createWriteStream("Jsonaux/ID_handler.json");
    var id = 0,id2 = 0,id3 = 0,id4 = 0;
    switch (type)
    {
        case 0:
            id = JSON.parse(idfile).IDMALE;
             id2 = JSON.parse(idfile).IDFEMALE;
             id3 = JSON.parse(idfile).IDGAY;
             id4 = JSON.parse(idfile).IDLESBY;
            idwriter.write('{"IDMALE" :' + (parseInt(id)+ 1).toString() + ', "IDFEMALE" : ' + (parseInt(id2)).toString()+ ', "IDGAY": '+ (parseInt(id3)).toString() +', "IDLESBY" :' + (parseInt(id4)).toString()+ '}');
            idwriter.close();
            break;
        case 1:
            id = JSON.parse(idfile).IDFEMALE;
             id2 = JSON.parse(idfile).IDMALE;
             id3 = JSON.parse(idfile).IDGAY;
             id4 = JSON.parse(idfile).IDLESBY;
            idwriter.write('{"IDMALE" :' + (parseInt(id2)).toString() + ', "IDFEMALE" : ' + (parseInt(id) + 1).toString()+ ', "IDGAY": '+ (parseInt(id3)).toString() +', "IDLESBY" :' + (parseInt(id4)).toString()+ '}');
            idwriter.close();
            break;
        case 2:
            id = JSON.parse(idfile).IDGAY;
             id2 = JSON.parse(idfile).IDFEMALE;
             id3 = JSON.parse(idfile).IDMALE;
             id4 = JSON.parse(idfile).IDLESBY;
            idwriter.write('{"IDMALE" :' + (parseInt(id3)).toString() + ', "IDFEMALE" : ' + (parseInt(id2)).toString()+ ', "IDGAY": '+ (parseInt(id) +1).toString() +', "IDLESBY" :' + (parseInt(id4)).toString()+ '}');
            idwriter.close();
            break;
        case 3:
            id = JSON.parse(idfile).IDLESBY;
             id2 = JSON.parse(idfile).IDFEMALE;
             id3 = JSON.parse(idfile).IDGAY;
             id4 = JSON.parse(idfile).IDMALE;
            idwriter.write('{"IDMALE" :' + (parseInt(id4)).toString() + ', "IDFEMALE" : ' + (parseInt(id2)).toString()+ ', "IDGAY": '+ (parseInt(id3)).toString() +', "IDLESBY" :' + (parseInt(id)+1).toString()+ '}');
            idwriter.close();
            break;
    }
    const writer = fs.createWriteStream(src+"/profile"+id+".json");
    let a = JSON.stringify(raw.body);
    writer.write(a,{'flags': 'a+'});
    writer.close();
};

let jsonsrt ='{"photos":[]}';

const addtoAbum = function (raw) {
    var obj = JSON.parse(jsonsrt);
    obj['photos'].push(raw.files);
    jsonsrt = JSON.stringify(obj);
};
var id = 0;
const writeAlbum = function (type) {
    const idfile = fs.readFileSync("Jsonaux/ID_handler.json");
    switch (type)
    {
        case 0:
             id = parseInt(JSON.parse(idfile).IDMALE);
            const writer1 = fs.createWriteStream("JsonalbumMale/profile"+(id-1).toString()+".json");
            writer1.write(jsonsrt);
            break;
        case 1:
            id = parseInt(JSON.parse(idfile).IDFEMALE);

            const writer2 = fs.createWriteStream("JsonalbumFemale/profile"+(id-1).toString()+".json");
            console.log(jsonsrt);
            writer2.write(jsonsrt);
            break;
        case 2:
            id = parseInt(JSON.parse(idfile).IDGAY);
            const writer3 = fs.createWriteStream("JsonalbumGay/profile"+(id-1).toString()+".json");
            writer3.write(jsonsrt);
            break;
        case 3:
            id = parseInt(JSON.parse(idfile).IDLESBY);
            const writer4 = fs.createWriteStream("JsonalbumLesby/profile"+(id-1).toString()+".json");
            writer4.write(jsonsrt);
            break;
    }
};

app.get('/', function(req, res, next) {
    jsonsrt = '{"photos":[]}';
    res.render('index', {title:'UploadPage',photo_source_ :'',name_ : '' , sex_ : '' , description_:'', age_:'', weight_:'',
        height_: '' ,boost_:'', nationality_:'', haircolor_:'', price_:''})
});

app.post('/', upload.any(), function (req,res,next) {
    if(JSON.stringify(req.body["Sex"])=== '"Male"')
    {
        type = 0;
        writeJson("JsonMale", req)
    }
    if(JSON.stringify(req.body["Sex"])=== '"Female"')
    {
        type = 1;
        writeJson("JsonFemale", req)
    }
    if(JSON.stringify(req.body["Sex"])=== '"Gay"')
    {
        type = 2;
        writeJson("JsonMale", req)
    }
    if(JSON.stringify(req.body["Sex"])=== '"Lesby"')
    {
        type = 3;
        writeJson("JsonMale", req)
    }
    console.log(JSON.stringify(req.body["Sex"]));
    res.render('index', {title:'UploadPage',photo_source_ :'',name_ : '' , sex_ : '' , description_:'', age_:'', weight_:'',
        height_: '' ,boost_:'', nationality_:'', haircolor_:'', price_:''})
});

app.post('/addmore',albumUpload.any(),function (req,res,next) {
    addtoAbum(req);
    writeAlbum(type);
    app.get('');
    res.render('index', {title:'UploadPage',photo_source_ :'',name_ : '' , sex_ : '' , description_:'', age_:'', weight_:'',
        height_: '' ,boost_:'', nationality_:'', haircolor_:'', price_:''})
});


app.post("/filter",upload.any(),function (req, res, next) {
   console.log(req.body);
    res.render('index', {title:'UploadPage',photo_source_ :'',name_ : '' , sex_ : '' , description_:'', age_:'', weight_:'',
        height_: '' ,boost_:'', nationality_:'', haircolor_:'', price_:''})
});


module.exports = app;
