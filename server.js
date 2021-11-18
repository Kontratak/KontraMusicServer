var express = require('express')
var dbops = require('./db_operations')
var bodyParser = require('body-parser')
const musicfolder = './musics/';
const picturefolder = './pictures/';
const fs = require('fs');
const mm = require('music-metadata');
const util = require('util');
const expressLayouts = require('express-ejs-layouts')
const fileUpload = require('express-fileupload');
const { url } = require('inspector');
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
app.set('layout', './views/layout')
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
var messages = [];

app.get('/getMusics',async (req,res) => {
    let results = await dbops.getFromCollection("Musics");
    res.send(results);
})


async function getFileProp(file){
    let result = await getMetaData(file);
    var fileprops = {path : file,props : result};
    return fileprops;
}

function removeExt(file){
    return file.split('.').slice(0, -1).join('.');
}

function getFormat(formattype){
    return "."+formattype.split("/")[1];
}

async function getMetaData(file){
    try {
        const metadata = await mm.parseFile(musicfolder+file);
        var filepath = picturefolder+removeExt(file)+getFormat(metadata.common.picture[0].format);
        await fs.writeFile(filepath,metadata.common.picture[0].data,'base64', function(err) {
            if (err) throw err;
            console.log('File is created successfully.');
        });
        metadata.common.picture[0].data = filepath.slice(1,filepath.length);
        return metadata["common"];
      } catch (error) {
        console.error(error.message);
      }
}


app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/views/index.html');
    res.render('index', { title: 'Index', layout: 'layout' })
  });

  
app.get('/AddMusic', (req, res) => {
    res.render('add_music', { title: 'Add Music', layout: 'layout' })
    //res.sendFile(__dirname + '/views/add_music.html');
});
  
app.get('/EditMusic', async (req, res) => {
    var music = await dbops.getFromCollectionbyId("Musics",req.query.id);
    res.render('edit_music', { title: `Edit Music`, layout: 'layout',music : music })
    //res.sendFile(__dirname + '/views/add_music.html');
});

  
app.post('/addMusic', async function(req, res) {
    let music = req.files.music;
    console.log("music is uploading");
    await music.mv('./musics/' + music.name);
    let result = await getFileProp(music.name);
    dbops.insertToCollection("Musics",result);
    console.log("music uploaded");
    res.redirect(`/AddMusic`);
  });
  
app.get('/ListMusics', (req, res) => {
    res.render('list_musics', { title: 'List Musics', layout: 'layout' })
    //res.sendFile(__dirname + '/views/list_musics.html');
});

app.get('/removeMusic', async (req,res) =>{
    var music = await dbops.getFromCollectionbyId("Musics",req.query.id);
    try {
        fs.unlinkSync(musicfolder+music.path);
        fs.unlinkSync("."+music.props.picture[0].data);
        //file removed
      } catch(err) {
        console.error(err)
    }
    dbops.removeFromCollectionById("Musics",req.query.id)
    res.redirect(req.get('referer'));
});

app.get('/editMusic', (req,res) =>{
});


app.post('/login', (req, res) => {
    // Insert Login Code Here
    let username = req.body.username;
    let password = req.body.password;
    res.redirect(`/?username=${username}`);
});

app.listen(80,()=>{
    console.log("Server Listening on 80")
})