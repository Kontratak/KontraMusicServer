var express = require('express');
var router = express.Router();
  
router.get('/Login', (req, res) => {
    res.render('login', { title: 'Login', layout: 'layout' })
    //res.sendFile(__dirname + '/views/add_music.html');
});
  
router.get('/Register', async (req, res) => {
    res.render('register', { title: `Register`, layout: 'layout'})
    //res.sendFile(__dirname + '/views/add_music.html');
});

  
// router.get('/ListMusics', (req, res) => {
//     res.render('list_musics', { title: 'List Musics', layout: 'layout' })
//     //res.sendFile(__dirname + '/views/list_musics.html');
// });


module.exports = router;