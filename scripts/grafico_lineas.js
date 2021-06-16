/**
 * div containers
 */
let g_lines_div = document.getElementById("grafico_lineas_placeholder");
let g_bar_div = document.getElementById("grafico_barras_placeholder");
let g_cake_div = document.getElementById("grafico_torta_placeholder");

/**
 * Draws a line graphic with the information of number of avistamientos per date
 * @param data List of tuples (n_avistamientos, date)
 */
function draw_g_lines(data) {
    // data received: [(n_avistamientos, date), ...]

    let parsed_data = [];  // list of dictionaries instead of list of tuples.
    for (let i = 0; i < data.length; i++) {
        parsed_data.push({
            'x': data[i]['fecha'],
            'y': data[i]['n_avistamientos']
        })
    }
    // console.log(parsed_data);

    let options = {
        chart: {
            height: 380,
            width: "100%",
            type: 'line',
            animations: {
                initialAnimation: {
                    enabled: false
                }
            }
        },
        series: [{
            name: "Series 1",
            data: parsed_data,
        }],
        xaxis: {
            type: "datetime"
        },
        stroke: {
            curve: 'smooth'
        },
    };
    document.getElementById('grafico_lineas_placeholder').innerText = "";
    let chart = new ApexCharts(document.getElementById('grafico_lineas_placeholder'), options);

    chart.render();
}

/**
 * Draws a bar graphic with the information of number of avistamientos per estado on each date.
 * @param data List of dictionaries with 'fecha', 'estado' and 'n_avistamientos'
 */
function draw_g_bar(data) {

    let dates = [];
    let series_vivo = [];
    let series_muerto = [];
    let series_nose = [];
    let i = 0;
    while (i < data.length) {
        let j = i;
        dates.push(data[i]['fecha']);  // add the new date
        while (j < data.length && data[i]['fecha'] === data[j]['fecha']) {  // for all data on that date, append
            switch (data[j]['estado']) {
                case 'vivo':
                    series_vivo.push(data[j]['n_avistamientos']);
                    break;
                case 'muerto':
                    series_muerto.push(data[j]['n_avistamientos']);
                    break;
                case 'no sé':
                    series_nose.push(data[j]['n_avistamientos']);
                    break;
            }
            j++;
        }
        i = j;
    }


    let options = {
        chart: {
            height: 380,
            width: "100%",
            type: 'bar',
            animations: {
                initialAnimation: {
                    enabled: false
                }
            }, plotOptions: {
              bar: {
                horizontal: false,
                dataLabels: {
                  position: 'top',
                },
              }
            }, dataLabels: {
              enabled: true,
              offsetX: -6,
              style: {
                fontSize: '12px',
                colors: ['#fff']
              }
            }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        series: [{
            //data: [44, 55, 41, 64, 22, 43, 21],
            data: series_vivo,
            name: "Vivo"
          }, {
            // data: [53, 32, 33, 52, 13, 44, 32],
            data: series_muerto,
            name: "Muerto"
          }, {
            data: series_nose,
            name: "No sé"
        }],
        xaxis: {
            categories: dates,
            // categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
        },
    };
    document.getElementById('grafico_barras_placeholder').innerText = "";
    let chart = new ApexCharts(document.getElementById('grafico_barras_placeholder'), options);

    chart.render();
}

/**
 * Draws a cake graphic with the information of number of avistamientos per tipo.
 * @param data List of jsons with 'n_avistamientos' and 'tipo'
 */
function draw_g_cake(data) {
    let series = [];
    let labels = [];
    for (let i = 0; i < data.length; i++) {
        series.push(data[i]['n_avistamientos'])
        labels.push(data[i]['tipo'])
    }
    // console.log(series);
    // console.log(labels);

    let options = {
        chart: {
            height: 380,
            width: "100%",
            type: 'pie',
            animations: {
                initialAnimation: {
                    enabled: false
                }
            }
        },
        series: series,
        labels: labels
    };
    document.getElementById('grafico_torta_placeholder').innerText = "";
    let chart = new ApexCharts(document.getElementById('grafico_torta_placeholder'), options);

    chart.render();

}

/**
 * Draws the line, bar and cake graphics, using data from server, on the document.
 * @returns {boolean} False in order to avoid reloading the page.
 */
function draw_g() {
    // let infop = document.getElementById("infop");

    let xmlhttprequest = new XMLHttpRequest();
    xmlhttprequest.open("GET", '../cgi-bin/graph_data_parser.py');
    xmlhttprequest.timeout = 1000;
    xmlhttprequest.onload = async function (pe) {
        let json_request = await JSON.parse(xmlhttprequest.responseText);
        let json_data = JSON.parse(
            JSON.parse(
                JSON.stringify(
                    JSON.parse(xmlhttprequest.responseText)
                )
            ).replace(/'/g, '"')
        );
        // console.log(json_data);
        // infop.innerText = json_data;
        // infop.innerText += ", que es el json de: "
        // infop.innerText += json_request;

        draw_g_lines(json_data['time_series']);
        draw_g_cake(json_data['count_tipo']);
        draw_g_bar(json_data['time_series_by_estado']);
    }
    xmlhttprequest.onerror = function (pe) {
        console.log("FAILED to retrieve the data, retrying in 1 second");
        setTimeout(() => {draw_g();}, 1000);
    }
    xmlhttprequest.send(null);
    xmlhttprequest.ontimeout = function (pe) {
        console.log("FAILED to retrieve the data, retrying in 3 seconds");
        setTimeout(() => {draw_g();}, 3000);
    }

    return false;
}


draw_g();
