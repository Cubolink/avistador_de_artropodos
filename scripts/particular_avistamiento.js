const temp_main_table_info = {  // For some reason I have to display the table as there were more than 1 avistamiento,
    // but with the same date, I didn't understand that requirement but well, 'avistamientos' is a list to achieve that.
    "row1":{"fecha":"2021-03-29 13:21", "region":"Región Metropolitana de Santiago", "comuna":"La Florida", "sector":"Vicuña Mackena",
        "nombre":"Kuroba Kaito", "email":"kuroba@kaito.kid", "celular":"+56 9 1234 4567",
        "avistamientos":[
            {"tipo":"insecto", "estado":"vivo", "fotos":["../images/example/chinita.PNG"]}
        ]},
    "row2":{"fecha":"2021-03-27 10:03", "region":"Región Metropolitana de Santiago", "comuna":"Providencia", "sector":"Plaza Italia",
        "nombre":"Edogawa Conan", "email":"edogawa@conan.jp", "celular":"+56 9 2345 5671",
        "avistamientos":[
            {"tipo":"arácnido", "estado":"vivo", "fotos":["../images/example/laquetengaña.PNG"]}
        ]},
    "row3":{"fecha":"2021-03-26 22:30", "region":"Región Metropolitana de Santiago", "comuna":"Santiago", "sector":"Parque Almagro",
        "nombre":"Heiji Hattori", "email":"heiji@hattori.jp", "celular":"+56 9 3456 6712",
        "avistamientos":[
            {"tipo":"insecto", "estado":"desconocido", "fotos":["../images/example/polisha.PNG"]}
        ]},
    "row4":{"fecha":"2021-03-24 21:53", "region":"Región Metropolitana de Santiago", "comuna":"Ñuñoa", "sector":"Plaza Ñuñoa",
        "nombre":"Vermouth", "email":"j", "celular":"+56 9 4567 7123",
        "avistamientos":[
            {"tipo":"miriápodo", "estado":"vivo", "fotos":["../images/example/100patas.PNG"]}]},
    "row5":{"fecha":"2021-03-24 19:30", "region":"Región Metropolitana de Santiago", "comuna":"Puente Alto", "sector":"Los Álamos",
        "nombre":"Akai Shuichi", "email":"akai@shu.jp", "celular":"+56 9 5671 2345",
        "avistamientos":[
            {"tipo":"insecto", "estado":"vivo", "fotos":["../images/example/polishadeux.PNG"]}
        ]}
}

function fill_document() {
    let fecha = document.getElementById("fecha");
    let region = document.getElementById("region");
    let comuna = document.getElementById("comuna");
    let sector = document.getElementById("sector");
    let tipo = document.getElementById("tipo");
    let estado = document.getElementById("estado");
    let fotos_txt = document.getElementById("fotos_text");
    let fotos_row = document.getElementById("fotos");
    let nombre = document.getElementById("nombre");
    let email = document.getElementById("email");
    let celular = document.getElementById("celular");

    let params = (window.location.href).substr((window.location.href).indexOf('?id=')+("?id=".length));
    let id = params.split('&')[0];

    fecha.append("Fecha: " + temp_main_table_info[id]['fecha']);
    region.append("Region: " + temp_main_table_info[id]['region']);
    comuna.append("Comuna: " + temp_main_table_info[id]['comuna']);
    if (temp_main_table_info[id]['sector'] !==  "") {
        sector.append("Sector: " + temp_main_table_info[id]['sector']);
    }
    tipo.append("Tipo: " + temp_main_table_info[id]['avistamientos'][0]['tipo']);
    estado.append("Estado: " + temp_main_table_info[id]['avistamientos'][0]['estado']);
    fotos_txt.append("Fotos: ");
    for (let i=0; i < temp_main_table_info[id]['avistamientos'][0]['fotos'].length; i++) {
        let img = document.createElement("img");
            img.alt = "Imagen del avistamiento";
            img.src = temp_main_table_info[id]['avistamientos'][0]['fotos'][i];
            img.addEventListener('click', function (e) {
                display_big_img(temp_main_table_info[id]['avistamientos'][0]['fotos'][i]);
            })
        fotos_row.append(img);
    }

    nombre.append("Nombre: " + temp_main_table_info[id]['nombre']);
    email.append("Correo: " + temp_main_table_info[id]['email']);
    if (temp_main_table_info[id]['sector'] !== "") {
        celular.append("Celular: " + temp_main_table_info[id]['celular']);
    }

}

function display_big_img (src) {
    let modal_environment = document.createElement("div");
    modal_environment.className = "modal_environment";
    modal_environment.id = "modal_big_photo";
        let modal_img = document.createElement("img");
            modal_img.alt = "Imagen del avistamiento grande";
            modal_img.className = "center";
            let i = src.length-1;
            while (i >= 0) {
                if (src[i] === '.') {
                    modal_img.src =
                        src.substr(0, i)
                        + "-big"
                        + src.substr(i, src.length);  // "file.ext" -> "file-big.ext"
                    break;
                }
                i--;
            }
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

fill_document()