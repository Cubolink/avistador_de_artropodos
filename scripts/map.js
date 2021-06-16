// Making a map and tiles

const map = L.map('map_id').setView([0, 0], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

// Marking the markers icons
const marker_icon = L.icon({
    iconUrl: '../images/marker.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});

let markers = [];  // list of markers


/**
 * Render the document that a marker popup will display, using the data received.
 * @param data_list Data to use to render the document popup.
                    It's a list of json with 'estado', 'tipo', 'fecha', 'rutas' and 'filenames'
 * @returns {HTMLTableElement}
 */
function render_marker_message(data_list) {
    let table = document.createElement('table');
    for (let i = 0; i < data_list.length; i++) {
        let row = document.createElement('tr');
        row.onclick = function open_row(me) {
            window.open(
                "particular_avistamiento.py?id="+data_list[i]['avistamiento_id'],
                "Detales del avistamiento",
                "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes"
                )
        };
        row.className = "clickable_row";

        let estado_td = document.createElement('td');
            estado_td.append(data_list[i]['estado']);
        let tipo_td = document.createElement('td');
            tipo_td.append(data_list[i]['tipo']);
        let fecha_td = document.createElement('td');
            fecha_td.append(data_list[i]['fecha']);
        let foto_td = document.createElement('td');
            for (let j = 0; j < data_list[i]['rutas'].length; j++) {
                let foto_div = document.createElement('div');
                    let foto_img = document.createElement('img');
                        foto_img.src = data_list[i]['rutas'][j]+"-small";
                        foto_img.alt = data_list[i]['filenames'][j];
                        foto_img.style.maxWidth = "5em";
                        foto_img.style.maxHeight = "5em";
                    foto_div.append(foto_img);
                foto_td.append(foto_div);
            }

        row.append(foto_td, estado_td, tipo_td, fecha_td);
        table.append(row);
    }
    return table;
}


/**
 * Creates the html content of a marker popup, loading the data needed from the server.
 * @param comuna_id id of the comuna that the marker is representing.
 * @param popup popup element to modify its content.
 */
function crochet_marker_popup(comuna_id, popup) {
    let xmlhttprequest = new XMLHttpRequest();
    xmlhttprequest.open("GET", '../cgi-bin/get_map_info.py?l_comuna_id='+comuna_id);
    xmlhttprequest.timeout = 1000;
    xmlhttprequest.onload = async function () {
        let json_data = JSON.parse(
            JSON.parse(
                JSON.stringify(
                    JSON.parse(xmlhttprequest.responseText)
                )
            ).replace(/'/g, '"')
        );
        popup.setContent(render_marker_message(json_data["l_comuna_id"]));

    }
    xmlhttprequest.onerror = function (pe) {
        console.log("FAILED to retrieve the data");
    }
    xmlhttprequest.send(null);
}


/**
 * Adds a leaflet marker to the list of markers.
 * @param lat latitude of the marker.
 * @param lon longitude of the marker.
 * @param comuna_name name of the comuna that the marker is representing.
 * @param comuna_id id of the comuna that the marker is representing.
 * @param comuna_n_avistamientos number of avistamientos of the comuna that the marker is representing.
 */
function add_marker(lat, lon, comuna_name, comuna_id, comuna_n_avistamientos) {
    let marker_title = comuna_name + ": ";
    if (comuna_n_avistamientos === 1) {
        marker_title += comuna_n_avistamientos + " avistamiento.";
    } else {
        marker_title += comuna_n_avistamientos + " avistamientos.";
    }

    let new_marker = L.marker([lat, lon], {
        icon: marker_icon,
        title: marker_title});
    new_marker.addTo(map);
    new_marker.bindPopup(`<b>Now loading comuna ${comuna_id}... Please wait</b>`);  // Default message of the popup.
    new_marker.on('popupopen', function (event) {
        // Execute the creation of the inside of the popup when it's open.

        let opened_popup = event.popup;
        crochet_marker_popup(comuna_id, opened_popup);
    })

    markers.push(new_marker);
}


/**
 * Add markers for each comuna on the json_data with information about the avistamientos per comuna.
 * @param json_data Json with 'n_per_comuna' a list of jsons with 'comuna', 'comuna_id' and 'n_avistamientos'
 * @param lat_lon_json List of json with the latitudes and longitudes of each comuna: 'name', 'lat', 'lng'
 */
function add_markers(json_data, lat_lon_json) {
    for (let i=0; i < json_data["n_per_comuna"].length; i++) {
        // world's slowest algorithm
        // search the lat lon in the array of latlons one by one
        let j = 0;
        while (j < lat_lon_json.length && lat_lon_json[j]["name"] !== json_data["n_per_comuna"][i]["comuna"]) {
            j++;
        }
        if (j === lat_lon_json.length) {
            console.log("Error en la comuna", json_data["n_per_comuna"][i]["comuna"]);
            console.log("No sé encontró la comuna. Este problema es probablemente debido a una inconsistencia en el" +
                " JSON de latitudes longitudes con los nombres de las comunas en la base de datos");
            continue;
        }
        if (lat_lon_json[j]["name"] === json_data["n_per_comuna"][i]["comuna"]) {
            add_marker(lat_lon_json[j]["lat"], lat_lon_json[j]["lng"],
                lat_lon_json[j]["name"], json_data["n_per_comuna"][i]["comuna_id"],
                json_data["n_per_comuna"][i]["n_avistamientos"]);
        }
    }
}


/**
 * With the json of latitudes and longitudes of each comuna, retrieves the info of avistamientos per comuna and
 * calls to create markers to the map.
 * @param lat_lon_json List of json with the latitudes and longitudes of each comuna: 'name', 'lat', 'lng'
 */
function retrieve_map_data(lat_lon_json) {
    let xmlhttprequest = new XMLHttpRequest();
    xmlhttprequest.open("GET", '../cgi-bin/get_map_info.py?n_per_comuna=True');
    xmlhttprequest.timeout = 1000;
    xmlhttprequest.onload = async function () {
        let json_data = JSON.parse(
            JSON.parse(
                JSON.stringify(
                    JSON.parse(xmlhttprequest.responseText)
                )
            ).replace(/'/g, '"')
        );

        add_markers(json_data, lat_lon_json);
    }
    xmlhttprequest.onerror = function (pe) {
        console.log("FAILED to retrieve the data");
    }
    xmlhttprequest.send(null);
}


/** Gets the info of latitude and longitude of each comuna,
 * then calls to retrieve data of the avistamientos per comuna and to generate markers on the map for each one.
 */
$.getJSON('../scripts/latitud-longitud.json', function (data) {
    retrieve_map_data(data);
})
