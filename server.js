var express = require('express')
var bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
var musics = require('./controllers/musics_controller.js');
var playlists = require('./controllers/playlist_controller.js');
var youtube = require('./controllers/youtube_controller.js');
const fileUpload = require('express-fileupload');
var path = require("path");
var app = express()

app.use(fileUpload({
    createParentPath: true
}));

app.use(function (req, res, next) {
    var filename = path.basename(req.url);
    if (req.url.includes("musics") || req.url.includes("pictures"))
        console.log("The file " + filename + " was requested.");
    next();
});

app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressLayouts)
app.set('layout', './views/shared/layout')
app.set('views', [__dirname + '/views',__dirname + '/views/shared',__dirname + '/views/musics',__dirname + '/views/playlists',__dirname + '/views/youtube'])
app.set('view engine', 'ejs')
app.use('/Musics', musics);
app.use('/Playlists', playlists);
app.use('/Youtube', youtube);


app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/views/index.html');
    res.render('index', { title: 'Index', layout: 'layout' })
});


app.listen(80,()=>{
    console.log("Server Listening on 80")
})