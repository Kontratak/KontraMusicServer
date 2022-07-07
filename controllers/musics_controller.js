
const util = require('util');
var express = require('express');
var router = express.Router();
  
router.get('/AddMusic', (req, res) => {
    res.render('add_music', { title: 'Add Music', layout: 'layout' })
    //res.sendFile(__dirname + '/views/add_music.html');
});
  
router.get('/EditMusic', async (req, res) => {
    var music = await dbops.getFromCollectionbyId("Musics",req.query.id);
    res.render('edit_music', { title: `Edit Music`, layout: 'layout',music : music })
    //res.sendFile(__dirname + '/views/add_music.html');
});

  
router.get('/ListMusics', (req, res) => {
    res.render('list_musics', { title: 'List Musics', layout: 'layout' })
    //res.sendFile(__dirname + '/views/list_musics.html');
});


module.exports = router;