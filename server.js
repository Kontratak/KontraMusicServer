var express = require('express')
var bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
var musics = require('./controllers/musics_controller.js');
var playlists = require('./controllers/playlist_controller.js');
var youtube = require('./controllers/youtube_controller.js');
var api = require('./controllers/api_controller.js');
var auth = require('./controllers/auth_controller.js');
const fileUpload = require('express-fileupload');
var path = require("path");
var session = require('express-session')
var { expressjwt: jwt } = require("express-jwt");
var app = express()

app.use(session({
    secret: "0c8c0bfdf43fa68c7544fcd0b8cecd0e9fa1cf966bb5d7",
    resave: true,
    secure : false,
    saveUninitialized: true,
    maxAge : 60 * 60 * 1000,
    cookie: { secure: true }
}));


app.use(fileUpload({
    createParentPath: true
}));


app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressLayouts)
app.set('layout', './views/shared/layout')

app.set('views', [__dirname + '/views',__dirname + '/views/shared',__dirname + '/views/musics',__dirname + '/views/playlists',__dirname + '/views/youtube'])
app.set('view engine', 'ejs')
app.use('/Musics', musics);
app.use('/Playlists', playlists);
app.use('/Youtube', youtube);
app.use('/api', api);
app.use('/', auth);

app.use(
    "/api",
    jwt({
      secret: "0c8c0bfdf43fa68c7544fcd0b8cecd0e9fa1cf966bb5d7b7389646134942811a67995b40b8c0f5f1e08ac2edd2fafb773bbd44b13370c2cda594edef243fad2104850c75e2e53901fb667d521f6bbee7",
      algorithms: ["HS256"],
    }).unless({ path: ["/api/login","/api/register"] })
);


app.use(function (req, res, next) {
    var filename = path.basename(req.url);
    if (req.url.includes("musics") || req.url.includes("pictures")){
        console.log("The file " + filename + " was requested.");
    }
});

app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res.status(401).send("invalid token...");
    } else {
      next(err);
    }
});


app.use(function (req, res, next) {
    res.locals = {
      title : "Kontra Music Player Server",
      logo : "./dist/images/warsaw.jpg",
      user : session,
    };
    next();
 });




app.listen(80,()=>{
    console.log("Server Listening on 80")
})