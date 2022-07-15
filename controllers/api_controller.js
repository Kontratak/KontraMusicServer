const fs = require('fs');
const utils = require('../js/utilities/utils')
const musicfolder = './musics/';
const picturefolder = './pictures/';
var dbops = require('../db_operations')
var express = require('express');
var session = require('express-session')
let alert = require('alert'); 
var router = express.Router();

router.post('/addMusic', async function(req, res) {
    try {
        let music = req.files.music;
        let bitrate = req.body.quality + "K";
        console.log("Music is Uploading");
        await music.mv(musicfolder + music.name);
        await utils.saveMusicWithAllBitrates(music,bitrate);
        console.log("Music Bitrate Adjusted");
        let result = await utils.getFileProp(music.name,bitrate);
        dbops.insertToCollection("Musics",result);
        console.log(result)
        console.log("music uploaded");
        res.redirect(`/Musics/AddMusic`);
    } catch (error) {
        alert(error)
    }
  });

router.get('/removeMusic', async (req,res) =>{
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

router.get('/editMusic', (req,res) =>{
});

router.get('/removeAll', (req,res) =>{
    dbops.removeAllFromCollection("Musics");
    res.redirect(`/Musics/ListMusics`);
});

router.get('/getMusics',async (req,res) => {
    let results = await dbops.getFromCollection("Musics");
    res.send({ result : results});
})

router.post('/addPlaylist', function (req, res) {
    var result = {
      musics : JSON.parse(req.body.musicids),
      playlist_name : req.body.playlist_name
    }
    dbops.insertToCollection("Playlists",result);
    res.send("Inserted");
});

router.post('/login',async function (req, res) {
    var result = {
      email : req.body.email,
      password : req.body.password
    }
    var resp = await dbops.getFromCollectionbyProperty("Users",result)
    if(resp != null){
      req.session.user = resp
      req.session.save(function(err) {})
      res.locals.user = resp
      res.redirect(`/Musics/ListMusics`)
    }
    else{
      alert("user not found")
      res.redirect(req.get('referer'))
    }
});

router.post('/register', function (req, res) {
    var User = {
      email : req.body.email,
      password : req.body.password,
      first_name : req.body.first_name,
      last_name : req.body.last_name
    }
    dbops.insertToCollection("Users",User);
    res.redirect(req.get('referer'));
});

router.post('/loginMobile',async function (req, res) {
    var result = {
      email : req.body.email,
      password : req.body.password
    }
    var resp = await dbops.getFromCollectionbyProperty("Users",result)
    
});

router.post('/registerMobile',async function (req, res) {
    var User = {
      email : req.body.email,
      password : req.body.password,
      first_name : req.body.first_name,
      last_name : req.body.last_name
    }
    await dbops.insertToCollection("Users",User);
    res.redirect(`/Musics/ListMusics`)
});


router.get('/getPlaylists', async function (req, res) {
    let results = await dbops.getFromCollection("Playlists");
    res.send(results);
  });



module.exports = router;