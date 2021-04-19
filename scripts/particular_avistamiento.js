const temp_main_table_info = {  // For some reason I have to display the table as there were more than 1 avistamiento,
    // but with the same date, I didn't understand that requirement but well, 'avistamientos' is a list to achieve that.
    "row1":{"fecha":"2021-03-29 13:21", "region":"Región Metropolitana de Santiago", "comuna":"La Florida", "sector":"Vicuña Mackena",
        "nombre":"Kuroba Kaito", "email":"j", "celular":"+56 9 1234 4567",
        "avistamientos":[
            {"tipo":"insecto", "estado":"vivo", "fotos":[]}
        ]},
    "row2":{"fecha":"2021-03-27 10:03", "region":"Región Metropolitana de Santiago", "comuna":"Providencia", "sector":"Plaza Italia",
        "nombre":"Edogawa Conan", "email":"j", "celular":"+56 9 2345 5671",
        "avistamientos":[
            {"tipo":"arácnido", "estado":"vivo", "fotos":[]}
        ]},
    "row3":{"fecha":"2021-03-26 22:30", "region":"Región Metropolitana de Santiago", "comuna":"Santiago", "sector":"Parque Almagro",
        "nombre":"Heiji Hattori", "email":"j", "celular":"+56 9 3456 6712",
        "avistamientos":[
            {"tipo":"insecto", "estado":"desconocido", "fotos":[]}
        ]},
    "row4":{"fecha":"2021-03-24 21:53", "region":"Región Metropolitana de Santiago", "comuna":"Ñuñoa", "sector":"Plaza Ñuñoa",
        "nombre":"Vermouth", "email":"j", "celular":"+56 9 4567 7123",
        "avistamientos":[
            {"tipo":"miriápodo", "estado":"vivo", "fotos":[]}]},
    "row5":{"fecha":"2021-03-24 19:30", "region":"Región Metropolitana de Santiago", "comuna":"Puente Alto", "sector":"Los Álamos",
        "nombre":"Akai Shuichi", "email":"j", "celular":"+56 9 5671 2345",
        "avistamientos":[
            {"tipo":"insecto", "estado":"vivo", "fotos":[]}
        ]}
}

function fill_document() {
    let fecha = document.getElementById("fecha");
    let region = document.getElementById("region");
    let comuna = document.getElementById("comuna");
    let sector = document.getElementById("sector");
    let tipo = document.getElementById("tipo");
    let estado = document.getElementById("estado");
    let fotos = document.getElementById("fotos");
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
    fotos.append("Fotos: " + temp_main_table_info[id]['avistamientos'][0]['fotos']);
    nombre.append("Nombre: " + temp_main_table_info[id]['nombre']);
    email.append("Correo: " + temp_main_table_info[id]['email']);
    if (temp_main_table_info[id]['sector'] !== "") {
        celular.append("Celular: " + temp_main_table_info[id]['celular']);
    }

}

fill_document()