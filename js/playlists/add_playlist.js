$(document).ready(function () {
    var table = $('#music_list').DataTable();
    $.get('/api/getMusics',(data) =>{
        for(var i = 0; i<data.length;i++){
            table.row.add([
                `<input type="checkbox" name="music" class="checkbox_music" value="${data[i]._id}">`,
                `${data[i]._id}`,
                `${data[i].props.title}`,
                `${data[i].path}`,
                `${data[i].props.picture[0].data}`
            ]
            ).draw();
        }
    })
});

$('#Create').on('click',()=>{
    var musicids = [];
    var playlist_name = $('#playlist_name').val();
    var checked = $('.checkbox_music:checkbox:checked');
    var musics = $('[name="music"]');
    $.each(musics, function() {
        var $this = $(this);
        if($this.is(":checked")) {
            musicids.push($this.val());
        }
    });	
    $.post("/api/addPlaylist",{musicids : JSON.stringify(musicids),playlist_name : playlist_name},()=>{
        location.reload();
    })
});
