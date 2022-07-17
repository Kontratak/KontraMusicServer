var express = require('express');
var router = express.Router();
// About page route.


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


// About page route.
router.get('/ListPlaylists', function (req, res) {
  res.render('list_playlists', { title: 'List Musics', layout: 'layout' })
});


// About page route.
router.get('/AddPlaylist', function (req, res) {
  res.render('add_playlist', { title: 'List Musics', layout: 'layout' })
});



module.exports = router;