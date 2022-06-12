var dbops = require('../db_operations')
const musicfolder = './musics/';
const picturefolder = './pictures/';
const fs = require('fs');
const mm = require('music-metadata');
const util = require('util');
var express = require('express');
const { url } = require('inspector');
const spawn = require('await-spawn')
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

  
router.post('/addMusic', async function(req, res) {
    let music = req.files.music;
    let bitrate = req.body.quality + "K";
    console.log("Music is Uploading");
    await music.mv(musicfolder + music.name);
    //convert to bitrate user defined
    await spawn('ffmpeg', ['-i', './musics/' + music.name , '-b:a', bitrate, './musics/'+bitrate +"_" + music.name]);
    //--end of convert to bitrate user defined
    console.log("Music Bitrate Adjusted");
    let result = await getFileProp(music.name,bitrate);
    dbops.insertToCollection("Musics",result);
    console.log("music uploaded");
    res.redirect(`/Musics/AddMusic`);
  });
  
router.get('/ListMusics', (req, res) => {
    res.render('list_musics', { title: 'List Musics', layout: 'layout' })
    //res.sendFile(__dirname + '/views/list_musics.html');
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
    res.redirect(`/ListMusics`);
});

router.get('/getMusics',async (req,res) => {
    let results = await dbops.getFromCollection("Musics");
    res.send(results);
})


async function getFileProp(file,bitrate){
    let result = await getMetaData(file,bitrate);
    var fileprops = {path : bitrate + "_"+ file,props : result};
    return fileprops;
}

function removeExt(file){
    return file.split('.').slice(0, -1).join('.');
}

function getFormat(formattype){
    return "."+formattype.split("/")[1];
}

async function getMetaData(file){
    try {
        const metadata = await mm.parseFile(musicfolder+file);
        var filepath = picturefolder+removeExt(file)+getFormat(metadata.common.picture[0].format);
        await fs.writeFile(filepath,metadata.common.picture[0].data,'base64', function(err) {
            if (err) throw err;
            console.log('File is created successfully.');
        });
        metadata.common.picture[0].data = filepath.slice(1,filepath.length);
        fs.unlinkSync(musicfolder+file);
        return metadata["common"];
      } catch (error) {
        console.error(error.message);
      }
}


module.exports = router;