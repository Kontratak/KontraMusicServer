var express = require('express');
var router = express.Router();
var dbops = require('../db_operations')
// About page route.


router.get('/getPlaylists', async function (req, res) {
  let results = await dbops.getFromCollection("Playlists");
  res.send(results);
});


// About page route.
router.get('/ListPlaylists', function (req, res) {
  res.render('list_playlists', { title: 'List Musics', layout: 'layout' })
});


// About page route.
router.get('/AddPlaylist', function (req, res) {
  res.render('add_playlist', { title: 'List Musics', layout: 'layout' })
});

// About page route.
router.post('/addPlaylist', function (req, res) {
    var result = {
      musics : JSON.parse(req.body.musicids),
      playlist_name : req.body.playlist_name
    }
    dbops.insertToCollection("Playlists",result);
    res.send("Inserted");
});

module.exports = router;