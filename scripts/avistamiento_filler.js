const main_table_id = "main_table";

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


/**
 * Fill the main table of the avistamientos webpage.
 * @param table_id
 */
function fill_table(table_id) {
    let table = document.getElementById(table_id);
    let k = table.rows.length;

    for (let i = 1; i < k; i++) {
        let row = table.rows[i];
        // row.className = "row";
        row.id = "row"+i;
        row.className = "space clickable_row";
        for (let j = 0; j < row.children.length; j++) {
            row.children[j].className = "col space";
        }
        row.children[0].append(temp_main_table_info['row'+i]["fecha"]);
        row.children[1].append(temp_main_table_info['row'+i]["comuna"]);
        row.children[2].append(temp_main_table_info['row'+i]["sector"]);
        row.children[3].append(temp_main_table_info['row'+i]["nombre"]);
        row.children[4].append(temp_main_table_info['row'+i]["avistamientos"].length);
        function number_of_photos() {
            let cont = 0;
            // for each avistamiento in the row, set of avistamientos, on the table
            for (let n = 0; n < temp_main_table_info['row'+i]["avistamientos"].length; n++) {
                cont += temp_main_table_info['row'+i]["avistamientos"][n]["fotos"].length
            }
            return cont
        }
        row.children[5].append(number_of_photos().toString());

        row.addEventListener('click', function () {
            open_row(row);
        })

    }
}


/**
 * Redirects to a particular avistamiento based on a row of the avistamientos table
 * @param row
 */
function open_row(row) {
    window.location.href = "../templates/particular_avistamiento.html?id="+row.id;

}

fill_table(main_table_id);