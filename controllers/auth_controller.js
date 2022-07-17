var express = require('express');
var router = express.Router();
  
router.get('/Login', (req, res) => {
    var store = req.sessionStore
    for(var sid in store.sessions){ 
        var ses = JSON.parse(store.sessions[sid])
        store.destroy(sid, function (err, dat) {});     
    }
    res.render('index', { title: 'Index',layout : false})
    //res.sendFile(__dirname + '/views/add_music.html');
});
  
router.get('/Register', async (req, res) => {
    res.render('register', { title: `Register`, layout: 'layout'})
    //res.sendFile(__dirname + '/views/add_music.html');
});


router.get('/', (req, res) => {
    res.redirect('/Login')
});

  
// router.get('/ListMusics', (req, res) => {
//     res.render('list_musics', { title: 'List Musics', layout: 'layout' })
//     //res.sendFile(__dirname + '/views/list_musics.html');
// });


module.exports = router;