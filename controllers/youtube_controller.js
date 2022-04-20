var express = require('express');
var router = express.Router();
const ytplaylist = require('youtube-playlist-downloader');
// About page route.
router.get('/YoutubeDownload', function (req, res) {
    res.render('youtube_download', { title: 'Youtube Download', layout: 'layout' })
});

router.post('/Download', async function(req, res) {
    var link = req.body.link;
    ytplaylist(link,{url : link,name : "sa",quality : 137});
    return "Downloading...";
});


module.exports = router;