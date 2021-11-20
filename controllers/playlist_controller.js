var express = require('express');
var router = express.Router();

// About page route.
router.get('/getPlaylists', function (req, res) {
  res.send('About this wiki');
});


// About page route.
router.get('/ListPlaylists', function (req, res) {
  res.send('About this wiki');
});

module.exports = router;