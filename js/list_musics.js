$(document).ready(function () {
    $.get('/getMusics',(data) =>{
        for(var i = 0; i<data.length;i++){
            $('#musicList').append(
            `<tr>
                <td>
                    ${data[i]._id}
                </td>
                <td>
                    ${data[i].props.title}
                </td>
                <td>
                    ${data[i].path}
                </td>
                <td>
                    ${data[i].props.picture[0].data}
                </td>
                <td>
                    <button class="btn btn-primary" onClick="edit('${data[i]._id}')">Edit</button>
                    <button class="btn btn-danger" onClick="remove('${data[i]._id}')">Remove</button>
                </td>
            </tr>`
            );
        }
    })
});


function edit(id){
    location.href = `/EditMusic?id=${id}`;
}

function remove(id){
    $.get(`/removeMusic?id=${id}`,(data) =>{
        location.reload();
    })
}
