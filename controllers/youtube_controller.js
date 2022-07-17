var express = require('express');
var router = express.Router();
const ytplaylist = require('youtube-playlist-downloader');
// About page route.
router.get('/YoutubeDownload', function (req, res) {
    res.render('youtube_download', { title: 'Youtube Download', layout: 'layout' })
});

router.all("/*",function (req, res, next) {
    var store = req.sessionStore
    var isLoggedIn = false
    for(var sid in store.sessions){ 
        var ses = JSON.parse(store.sessions[sid])
        if(ses.user == null) {         
            store.destroy(sid, function (err, dat) {});      
        }
        else{
            isLoggedIn = true
            break
        }
    }
    if(isLoggedIn == false){
        console.log("UNAUTH")
        res.redirect("/Login")
    }
    else{
        next()
    }
});


router.post('/Download', async function(req, res) {
    var link = req.body.link;
    ytplaylist(link,{url : link,name : "sa",quality : 137});
    return "Downloading...";
});


module.exports = router;