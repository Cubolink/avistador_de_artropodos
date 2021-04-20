
// Variable from https://codepen.io/amigaviole/pen/NQOpKM,
// Uploader: yani (@amigaviole) (https://codepen.io/amigaviole)
// List of dictionaries. Each dictionary contains a name of the region which represents,
// and a list of the comunas that belong to that region
const regiones_y_comunas = [
    {
        "NombreRegion": "Arica y Parinacota",
        "comunas": ["Arica", "Camarones", "Putre", "General Lagos"]
    }, {
        "NombreRegion": "Tarapacá",
        "comunas": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]
    }, {
        "NombreRegion": "Antofagasta",
        "comunas": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"]
    }, {
        "NombreRegion": "Atacama",
        "comunas": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]
    }, {
        "NombreRegion": "Coquimbo",
        "comunas": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"]
    }, {
        "NombreRegion": "Valparaíso",
        "comunas": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"]
    }, {
        "NombreRegion": "Región del Libertador Gral. Bernardo O’Higgins",
        "comunas": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]
    }, {
        "NombreRegion": "Región del Maule",
        "comunas": ["Talca", "ConsVtución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "ReVro", "San Javier", "Villa Alegre", "Yerbas Buenas"]
    }, {
        "NombreRegion": "Región del Biobío",
        "comunas": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío", "Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]
    }, {
        "NombreRegion": "Región de la Araucanía",
        "comunas": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria",]
    }, {
        "NombreRegion": "Región de Los Ríos",
        "comunas": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"]
    }, {
        "NombreRegion": "Región de Los Lagos",
        "comunas": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "FruVllar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"]
    }, {
        "NombreRegion": "Región Aisén del Gral. Carlos Ibáñez del Campo",
        "comunas": ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Río Ibáñez"]
    }, {
        "NombreRegion": "Región de Magallanes y de la Antártica Chilena",
        "comunas": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "AntárVca", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
    }, {
        "NombreRegion": "Región Metropolitana de Santiago",
        "comunas": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "TilVl", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]
    }];

// List of subfilos. Contains dictionaries with the values,
// and spanish string and may include some classes as examples of the subfilo.
const arthropod_options = [
    /*{"value":"hexapoda", "option":"Hexápodo (Insecto u otro)"},
    {"value":"myriapoda","option":"Miriápodo"},
    {"value":"crustacea", "option":"Crustáceo"},
    {"value":"chelicerata", "option":"Quelicerado (Arácnido, Xifofuro o Picnogónido"}*/
    {"value":"hexapoda", "option":"Insecto"},
    {"value":"myriapoda","option":"Miriápodo"},
    {"value":"arachnidae", "option":"Arácnido"},
    {"value":"unknown", "option":"No sé"}
];

// List of discovery state of the arthropod.
const state_options = [
    {"value":"alive", "option":"Vivo"},
    {"value":"dead", "option":"Muerto"},
    // {"value":"unknown", "option":"Desconocido"}
    {"value":"unknown", "option":"No sé"}
]


/**
 * Adds an html form to allow the user to report an avistamiento.
 *
 * If is the first time adding the form, it'll add a button to send the form.
 * The following times will only add a section inside the form to report different avistamientos.
 */
function display_new_avistamiento_form() {

    // Get the html form that we will fill
    let add_elements_form = document.getElementById("nuevos_avistamientos");

    // Check if the form is empty
    if (add_elements_form.children.length === 0) {
        // if it is empty, we have to add:
        // * html div to put the inputs of each avistamiento
        // * html div to put the inputs of the contacto
        // * the button to send the form

        // avistamiento input
        let form_input_div = document.createElement("div");
        // submit button
        let submit_form_div = document.createElement("div");
            let submit_form_button = document.createElement("button");
                submit_form_button.type = "button";
                submit_form_button.append("Enviar Información de Avistamiento");
                submit_form_button.addEventListener('click', function () {
                    if (is_valid_form()) {
                        display_modal_confirmation();  // add a confirmation box before submitting
                    }
                })
            submit_form_div.append(submit_form_button);

        // contacto input
        let form_contacto_div = document.createElement("div");
        form_contacto_div.className = "contacto flex_col";
        form_contacto_div.append("Info de Contacto");
            let form_contacto_name_div = document.createElement("div");
                let form_contacto_name_label = document.createElement("label");
                    form_contacto_name_label.htmlFor = "nombre";
                    form_contacto_name_label.append("Nombre:");
                let form_contacto_name_input = document.createElement("input");
                    form_contacto_name_input.id = "nombre";
                    form_contacto_name_input.name = "nombre";
                    form_contacto_name_input.className = "unchecked_input";
                    form_contacto_name_input.type = "text";
                    form_contacto_name_input.size = 100;
                    form_contacto_name_input.maxLength = 200;
                    form_contacto_name_input.required = true;
                form_contacto_name_div.append(form_contacto_name_label, form_contacto_name_input);
            let form_contacto_mail_phone_div = document.createElement("div");
                form_contacto_mail_phone_div.className = "flex_row";
                let form_contacto_mail_div = document.createElement("div");
                    let form_contacto_mail_label = document.createElement("label");
                        form_contacto_mail_label.append("Correo:")
                        form_contacto_mail_label.htmlFor = "email";
                    let form_contacto_mail_input = document.createElement("input");
                        form_contacto_mail_input.id = "email";
                        form_contacto_mail_input.name = "email";
                        form_contacto_mail_input.className = "unchecked_input";
                        // form_contacto_mail_input.type = "email";
                        form_contacto_mail_input.type = "text";
                        form_contacto_mail_input.size = 100;
                        form_contacto_mail_input.required = true;
                    form_contacto_mail_div.append(form_contacto_mail_label, form_contacto_mail_input)
                let form_contacto_phone_div = document.createElement("div");
                    let form_contacto_phone_label = document.createElement("label");
                        form_contacto_phone_label.htmlFor = "celular";
                        form_contacto_phone_label.append("Teléfono");
                    let form_contacto_phone_input = document.createElement("input");
                        form_contacto_phone_input.id = "celular";
                        form_contacto_phone_input.name = "celular";
                        form_contacto_phone_input.className = "unchecked_input";
                        // form_contacto_phone_input.type = "tel";
                        form_contacto_phone_input.type = "text";
                        form_contacto_phone_input.size = 15;
                    form_contacto_phone_div.append(form_contacto_phone_label, form_contacto_phone_input);
                form_contacto_mail_phone_div.append(form_contacto_mail_div, form_contacto_phone_div);
            form_contacto_div.append(form_contacto_name_div, form_contacto_mail_phone_div);
        add_elements_form.append(form_input_div, form_contacto_div, submit_form_div);
    }

    // Take the form's div where we'll put the inputs
    let form_main_div = add_elements_form.children[0];
    const i = add_elements_form.children[0].children.length;  // get the number of children to calculate html ids

    let new_div = document.createElement("div");
        new_div.className = "avistamiento";
        new_div.id = "new_avistamiento"+i;

        let datetime_div = document.createElement("div");  // div with date_time's label and input
            let datetime_label = document.createElement("label");
                datetime_label.htmlFor = "dia-hora-avistamiento"+i;
                datetime_label.append("Fecha y Hora");
            let datetime_input = document.createElement("input");
                datetime_input.name = "dia-hora-avistamiento";
                datetime_input.id = "dia-hora-avistamiento"+i;
                datetime_input.className = "unchecked_input";
                // datetime_input.type = "datetime-local";
                datetime_input.type = "text";
                datetime_input.size = 20;
                datetime_input.placeholder = "año-mes-dia hora:minuto";
                let time_now = new Date();
                datetime_input.value =
                    time_now.getFullYear() + "-"
                    + (time_now.getMonth()+1>10? time_now.getMonth()+1: "0"+(time_now.getMonth()+1)) + "-"
                    + (time_now.getDate()>10? time_now.getDate(): "0"+time_now.getDate()) + " "
                    + (time_now.getHours()>10? time_now.getHours(): "0"+time_now.getHours()) + ":"
                    + (time_now.getMinutes()>10? time_now.getMinutes(): "0"+time_now.getMinutes());
                datetime_input.required = true;
            datetime_div.append(datetime_label, datetime_input);
        let lugar_div = document.createElement("div");  // row with divs for region, comuna and sector
            lugar_div.className = "flex_row";
            let region_div = document.createElement("div");  // div with region's label and select
                region_div.className = "flex_col";
                let region_div_label = document.createElement("label");
                    region_div_label.htmlFor = "region"+i;
                    region_div_label.append("Region");
                let region_div_select = document.createElement("select");
                    region_div_select.name = "region";
                    region_div_select.id = "region"+i;
                    region_div_select.className = "unchecked_input";
                    region_div_select.required = true;
                    // the region options will be generated later
                region_div.append(region_div_label, region_div_select);
            let comuna_div = document.createElement("div");  // div with comuna 's label and select
                comuna_div.className = "flex_col";
                let comuna_div_label = document.createElement("label");
                    comuna_div_label.htmlFor = "comuna" + i;
                    comuna_div_label.append("Comuna");
                let comuna_div_select = document.createElement("select");
                    comuna_div_select.name = "comuna";
                    comuna_div_select.id = "comuna" + i;
                    comuna_div_select.className = "unchecked_input";
                    comuna_div_select.required = true;
                    comuna_div_select.innerHTML = "<option selected value=''>--Elija una Región--</option>"  // you need a region first
                    // as the comuna options depends on the region, they will be generated dynamically
                comuna_div.append(comuna_div_label, comuna_div_select);
            let sector_div = document.createElement("div");  // div with sector's label and input
                sector_div.className = "flex_col";
                let sector_div_label = document.createElement("label");
                    sector_div_label.htmlFor = "sector" + i;
                    sector_div_label.append("Sector");
                let sector_div_select = document.createElement("input");
                    sector_div_select.name = "sector";
                    sector_div_select.id = "sector" + i;
                    sector_div_select.className = "unchecked_input";
                    sector_div_select.type = "text";
                    sector_div_select.size = 200;
                    sector_div_select.maxLength = 100;

                sector_div.append(sector_div_label, sector_div_select);
            lugar_div.append(region_div, comuna_div, sector_div)
        let avistamiento_div = document.createElement("div");  // row with divs for description and photo
            avistamiento_div.className = "flex_row";
            let avistamiento_text_div = document.createElement("div");  // column with tipo and estado
                avistamiento_text_div.className = "flex_col";
                let avistamiento_text_div_type_label = document.createElement("label");
                    avistamiento_text_div_type_label.htmlFor = "tipo-avistamiento" + i;
                    avistamiento_text_div_type_label.append("Tipo");
                let avistamiento_text_div_type_select = document.createElement("select");
                    avistamiento_text_div_type_select.name = "tipo-avistamiento";
                    avistamiento_text_div_type_select.id = "tipo-avistamiento" + i;
                    avistamiento_text_div_type_select.className = "unchecked_input";
                    avistamiento_text_div_type_select.required = true;
                    let base_option = document.createElement("option");
                    base_option.value = ""; base_option.append("--Elija un subfilo de artrópodo--");
                    avistamiento_text_div_type_select.append(base_option);
                    for (let k = 0; k < arthropod_options.length; k++) {
                        let o = document.createElement("option");
                        o.value = arthropod_options[k]['value'];
                        o.append(arthropod_options[k]['option']);
                        avistamiento_text_div_type_select.append(o);
                    }
                let avistamiento_text_div_state_label = document.createElement("label");
                    avistamiento_text_div_state_label.htmlFor = "estado-avistamiento"+i;
                    avistamiento_text_div_state_label.append("Estado");
                let avistamiento_text_div_state_select = document.createElement("select");
                    avistamiento_text_div_state_select.name = "estado-avistamiento";
                    avistamiento_text_div_state_select.id = "estado-avistamiento"+i;
                    avistamiento_text_div_state_select.className = "unchecked_input";
                    avistamiento_text_div_state_select.required = true;
                    avistamiento_text_div_state_select.innerHTML = "<option value=\"\">--Elija un estado--</option>";
                    for (let k = 0; k < state_options.length; k++) {
                        let o = document.createElement("option");
                        o.value = state_options[k]["value"];
                        o.append(state_options[k]["option"]);
                        avistamiento_text_div_state_select.append(o);
                    }
                avistamiento_text_div.append(
                    avistamiento_text_div_type_label, avistamiento_text_div_type_select,
                    avistamiento_text_div_state_label, avistamiento_text_div_state_select
                )
            let avistamiento_photo_div = document.createElement("div"); // column with rows of photos photo
                avistamiento_photo_div.className = "flex_col";
                let avistamiento_photo_div_text = document.createElement("div");
                    avistamiento_photo_div_text.append("Foto");
                let avistamiento_photo_div_div = document.createElement("div");  // row with columns with input and preview
                    avistamiento_photo_div_div.className = "flex_row";
                    avistamiento_photo_div_div.id = "row_of_photo_divs"+i;
                    add_photo_column_input(avistamiento_photo_div_div, i);
                avistamiento_photo_div.append(avistamiento_photo_div_text, avistamiento_photo_div_div)
            avistamiento_div.append(avistamiento_text_div, avistamiento_photo_div);

        new_div.append(datetime_div, lugar_div, avistamiento_div);
    form_main_div.append(new_div);

    // now we can generate the region options
    generate_region_options(i);

    document.getElementById("region"+i).addEventListener('change', function () {display_comuna_options_k(i);})

    if (i > 0) {
        display_comuna_options_k(i);  // usually, we would wait until the user to select a region, but it's already preset
        sector_div_select.value = document.getElementById("sector0").value;
    }
}


/**
 * Generates the options that the 'select region' part will have.
 * @param k Used as suffix to search for the unique id of the html select for which we have to add the regions.
 */
function generate_region_options(k="") {
    console.log("Generating region Options");

    let options = document.getElementById("region"+k);

    options.innerHTML = "<option value=\"\">--Elija una Region--</option>";

    for (let i = 0; i < regiones_y_comunas.length; i++) {
        let option = document.createElement("option");
        option.value = regiones_y_comunas[i]["NombreRegion"];
        if (k > 0 && (option.value === document.getElementById("region0").value)) {
            // set default the selected option on the first avistamiento
            option.defaultSelected = true;
        }
        option.append(regiones_y_comunas[i]["NombreRegion"]);

        options.append(option);
    }

}


/**
 * Generates the options that the 'select comuna' part will have.
 * @param k Used as suffix to search for the unique id of the html select for which we have to add its options.
 */
function display_comuna_options_k(k) {
    console.log("Displaying comuna options, k="+k);
    let select_region = document.getElementById("region"+k);
    let select_comuna = document.getElementById("comuna"+k);

    select_comuna.innerHTML = "<option value=\"\">--Elija una Comuna--</option>";

    let options = [];
    // look for the selected region
    let i = 0;
    while (i<regiones_y_comunas.length) {
        let region = regiones_y_comunas[i];

        if (region["NombreRegion"] === select_region.value) {
            // add the comunas of that region
            options = region["comunas"];
            break;
        }

        i++;
    }

    // now that we have the option list, we can add them as html options
    for (let key in options) {
        let option_element = document.createElement("option");
        option_element.value = options[key];
        if (k > 0 && (option_element.value === document.getElementById("comuna0").value)) {
            option_element.defaultSelected = true;
        }

        option_element.append(options[key]);
        select_comuna.options.add(option_element);
    }

}


/**
 * If a div of photos doesn't have already 5 columns of photo input, adds another one.
 * Generates the dynamic html of the photo input.
 * @param row_photo_div id of the row of photos of the form in the corresponding avistamiento div.
 * @param k number of the avistamiento div where the row of photos is located.
 */
function add_photo_column_input(row_photo_div, k) {

    const j = row_photo_div.children.length;  // number of children of the row of photos, which is in the k avistamiento
    if (j < 5) {
        let photo_column = document.createElement("div");
            photo_column.className = "flex_col";
            let photo_input = document.createElement("input");
                photo_input.type = "file";
                photo_input.name = "foto-avistamiento";
                photo_input.id = "foto-avistamiento"+k+"_"+j;
                photo_input.className = "unchecked_input";
                photo_input.required = (j===0);  // only the first photo input is required. The other ones are optional.

            let photo_preview_div = document.createElement("div");
                photo_preview_div.className = "img_preview_div";
                photo_preview_div.id = "img_preview"+k+"_"+j;

            photo_column.append(photo_input, photo_preview_div);
        row_photo_div.append(photo_column);

        // previsualice
        photo_input.addEventListener('change', function (e) {
            const file = photo_input.files[0];

            if (photo_preview_div.children.length === 0) {
                let photo_div_preview_img = document.createElement("img");
                    photo_div_preview_img.alt = "Previsualización de la imagen seleccionada";
                    photo_div_preview_img.className = "img_preview_img";
                photo_preview_div.append(photo_div_preview_img);
            }
            let photo_div_preview_img = photo_preview_div.children[0];

            if (file) {
                const reader = new FileReader();
                photo_div_preview_img.style.display = "block";

                reader.addEventListener("load", function (e) {
                    photo_div_preview_img.setAttribute("src", e.target.result);
                })
                reader.readAsDataURL(file);
            } else {
                photo_div_preview_img.style.display = "null";
            }
        })
        // add other column when is added a file for the first time
        photo_input.addEventListener('change', function add_once(e) {
            photo_input.removeEventListener('change', add_once);
            add_photo_column_input(row_photo_div, k);
        })
    }
}


/**
 * Generates and displays a confirmation box over the page, to chose between submitting the form of continue editing it.
 */
function display_modal_confirmation() {
    let modal_environment = document.createElement("div");
    modal_environment.className = "modal_environment"
    let modal_box = document.createElement("div");
    modal_box.className = "box modal_box";
        let msg_div = document.createElement("div");
            msg_div.append("¿Está seguro de que desea enviar esta información?");
        let buttons_row = document.createElement("flex-row");
            let accept = document.createElement("button");
                accept.type = "button";
                accept.className = "accept_button";
                accept.append("Sí, estoy total y absolutamente seguro.")
                accept.addEventListener('click', function () {
                    if (is_valid_form()) {  // last validation check
                        // form.submit();
                        $.post('', $('nuevos_avistamientos').serialize());
                        document.getElementById('nuevos_avistamientos').innerHTML="";
                        display_success_msg();
                    }
                    // else: the form contains errors for some reason.
                    // In any case we remove the modal environment
                    document.body.removeChild(modal_environment);
                })

            let decline = document.createElement("button");
                decline.type = "button";
                decline.className = "decline_button";
                decline.append("No estoy seguro, quiero volver al formulario");
                decline.addEventListener('click', function () {
                    document.body.removeChild(modal_environment);  // remove this confirmation box and go back to the form
                })
            buttons_row.append(accept, decline);
        modal_box.append(msg_div, buttons_row);
    modal_environment.append(modal_box);
    modal_environment.id = "modal_env";
    document.body.append(modal_environment);
}


/**
 * Shows a messages that tells the user the form was submitted successfully.
 */
function display_success_msg() {
    let modal_environment = document.getElementById("success_msg");
    modal_environment.className = "modal_environment";
    let modal_box = document.createElement("div");
    modal_box.className = "headband modal_box";
        let msg_div = document.createElement("div");
            msg_div.append("Su formulario ha sido enviado correctamente.")
        let continue_button = document.createElement("button");
            continue_button.type = "button";
            continue_button.className = "accept_button";
            continue_button.append("Continuar");
            continue_button.addEventListener('click', function () {
                modal_environment.innerHTML = "";
                modal_environment.className = "";
            })
    modal_box.append(msg_div, continue_button);
    modal_environment.append(modal_box);
}