$(document).ready(function () {

    //$(".picker").imagepicker({show_label: true});
    $('#selectMusic').on('click', function () {
        $("#file-input").trigger('click');
    });

    $("#file-input").on("change", async function (event) {
        let file = [...event.target.files][0];
        $('#music_val').val(file.name);
    });
});
