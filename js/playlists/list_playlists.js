$(document).ready(function () {
    var table = $('#music_list').DataTable();
    $.get('/api/getPlaylists',(data) =>{
        for(var i = 0; i<data.length;i++){
            var listitem = "";
            for(var j = 0; j<data[i].musics.length;j++){
                listitem+=`<li>${data[i].musics[j]}</li>`;
            }
            table.row.add([
                `${data[i]._id}`,
                `${data[i].playlist_name}`,
                ` <ul class = "playlistmusiclist">
                    ${listitem}
                </ul>`,
                `<button class="btn btn-primary" onClick="edit('${data[i]._id}')">Edit</button>
                <button class="btn btn-danger" onClick="remove('${data[i]._id}')">Remove</button>`
            ]
            ).draw();
        }
    })
});
