const mm = require('music-metadata');
const spawn = require('await-spawn')
const musicfolder = './musics/';
const picturefolder = './pictures/';

module.exports = {
    
    saveMusicWithAllBitrates : async function saveMusicWithAllBitrates(music,bitrate){
        await spawn('ffmpeg', ['-i', './musics/' + music.name , '-b:a', bitrate, './musics/'+bitrate +"_" + music.name]);
    },
    
    getFileProp : async function getFileProp(file,bitrate){
        let result = await getMetaData(file);
        var fileprops = {path : bitrate + "_"+ file,props : result};
        return fileprops;
    },

    sessionId : ""
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
        console.log(metadata["common"])
        if(metadata["common"].title != undefined){
            console.log(metadata["common"].title)
            var filepath = picturefolder+removeExt(file)+getFormat(metadata.common.picture[0].format);
            await fs.writeFile(filepath,metadata.common.picture[0].data,'base64', function(err) {
                if (err) throw err;
                console.log('File is created successfully.');
            });
            metadata.common.picture[0].data = filepath.slice(1,filepath.length);
            fs.unlinkSync(musicfolder+file);
            return metadata["common"];
        }
        else{
            return {title : removeExt(file)};
        }
       
      } catch (error) {
        console.error(error.message);
      }
}