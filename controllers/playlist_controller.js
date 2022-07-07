var express = require('express');
var router = express.Router();
// About page route.


// About page route.
router.get('/ListPlaylists', function (req, res) {
  res.render('list_playlists', { title: 'List Musics', layout: 'layout' })
});


// About page route.
router.get('/AddPlaylist', function (req, res) {
  res.render('add_playlist', { title: 'List Musics', layout: 'layout' })
});



module.exports = router;