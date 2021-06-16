/**
 * Displays a bigger version of the image with id img_id, in front of the document.
 * @param img_id The id of the image which we want to display a bigger version.
 */
function display_big_img (img_id) {
    let original_img = document.getElementById(img_id);
    let src = original_img.src;
    if (src.substr(src.length-6) === '-small') {
        src = src.substr(0, src.length - 6);  // remove the '-small' substring
    }

    let modal_environment = document.createElement("div");
    modal_environment.className = "modal_environment";
    modal_environment.id = "modal_big_photo";
        let modal_img = document.createElement("img");
            modal_img.alt = "Imagen del avistamiento grande";
            modal_img.className = "center";
            modal_img.src = src+"-big";

        let close = document.createElement("button");
            close.type = "button";
            close.append("cerrar");
            close.addEventListener('click', function () {
                document.body.removeChild(modal_environment);
            });
            modal_environment.addEventListener('click', function close_modal_img (e) {
                if (!modal_img.contains(e.target)) {
                    // click outside the img
                    document.body.removeChild(modal_environment);
                    modal_environment.removeEventListener('click', close_modal_img);
                }
            })
        modal_environment.append(modal_img, close);
    document.body.append(modal_environment);
}