$(document).ready(function () {
    var table = $('#music_list').DataTable( {
        responsive: true
    });
    $.get('/api/getMusics',(data) =>{
        for(var i = 0; i<data.result.length;i++){
            table.row.add([
                `${data.result[i]._id}`,
                `${data.result[i].props != undefined ? data.result[i].props.title : "Prop Title Not Found"}`,
                `${data.result[i].path}`,
                `${data.result[i].props != undefined ? data.result[i].props.picture[0].data : "Prop Image Not Found"}`,
                `<button class="btn btn-primary" onClick="edit('${data.result[i]._id}')">Edit</button>
                <button class="btn btn-danger" onClick="remove('${data.result[i]._id}')">Remove</button>`
            ]
            ).draw();
        }
    })
});


function edit(id){
    location.href = `/EditMusic?id=${id}`;
}

function remove(id){
    $.get(`/api/removeMusic?id=${id}`,(data) =>{
        location.reload();
    })
}
