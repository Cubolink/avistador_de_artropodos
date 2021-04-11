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
    {"value":"hexapoda", "option":"Hexápodo (Insecto u otro)"},
    {"value":"myriapoda","option":"Miriápodo"},
    {"value":"crustacea", "option":"Crustáceo"},
    {"value":"chelicerata", "option":"Quelicerado (Arácnido, Xifofuro o Picnogónido"}
];
// List of discovery state of the arthropod.
const state_options = [
    {"value":"alive", "option":"Vivo"},
    {"value":"dead", "option":"Muerto"},
    {"value":"unknown", "option":"Desconocido"}
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
        // if it is, we have to add:
        // * html div to put the inputs of each avistamiento
        // * html div to put the inputs of the contacto
        // * the button to send the form

        // avistamiento input
        let form_input_div = document.createElement("div");
        // submit button
        let submit_form_button = document.createElement("button"); submit_form_button.type = "submit";
        submit_form_button.append("Enviar Formulario")

        // contacto input
        let form_contacto_div = document.createElement("div");
        form_contacto_div.className = "contacto flex_col";
        form_contacto_div.append("Info de Contacto");
            let form_contacto_name_div = document.createElement("div");
                let form_contacto_name_label = document.createElement("label");
                    form_contacto_name_label.htmlFor = "contact_name";
                    form_contacto_name_label.append("Nombre:");
                let form_contacto_name_input = document.createElement("input");
                    form_contacto_name_input.id = "contact_name";
                    form_contacto_name_input.name = "contact_name";
                    form_contacto_name_input.type = "text";
                form_contacto_name_div.append(form_contacto_name_label, form_contacto_name_input);
            let form_contacto_mail_phone_div = document.createElement("div");
                form_contacto_mail_phone_div.className = "flex_row";
                let form_contacto_mail_div = document.createElement("div");
                    let form_contacto_mail_label = document.createElement("label");
                        form_contacto_mail_label.append("Correo:")
                        form_contacto_mail_label.htmlFor = "contact_mail";
                    let form_contacto_mail_input = document.createElement("input");
                        form_contacto_mail_input.id = "contact_mail";
                        form_contacto_mail_input.name = "contact_mail";
                        form_contacto_mail_input.type = "email";
                    form_contacto_mail_div.append(form_contacto_mail_label, form_contacto_mail_input)
                let form_contacto_phone_div = document.createElement("div");
                    let form_contacto_phone_label = document.createElement("label");
                        form_contacto_phone_label.htmlFor = "contact_phone";
                        form_contacto_phone_label.append("Teléfono");
                    let form_contacto_phone_input = document.createElement("input");
                        form_contacto_phone_input.id = "contact_phone";
                        form_contacto_phone_input.name = "contact_phone";
                        form_contacto_phone_input.type = "tel";
                    form_contacto_phone_div.append(form_contacto_phone_label, form_contacto_phone_input);
                form_contacto_mail_phone_div.append(form_contacto_mail_div, form_contacto_phone_div);
            form_contacto_div.append(form_contacto_name_div, form_contacto_mail_phone_div);
        add_elements_form.append(form_input_div, form_contacto_div, submit_form_button);
        /*add_elements_form.appendChild(form_input_div);
        add_elements_form.appendChild(form_contacto_div);
        add_elements_form.appendChild(submit_form_button);*/
    }

    // Take the form's div where we'll put the inputs
    let form_main_div = add_elements_form.children[0];
    const i = add_elements_form.children[0].children.length;  // get the number of children to calculate html ids

    // Create the specific new single avistamiento 's div, its structure is based on the add_avistamiento_form.html

    let new_div = document.createElement("div");
        new_div.className = "avistamiento";
        new_div.setAttribute("name", "new_avistamiento");
        new_div.id = "new_avistamiento"+i;

        let datetime_div = document.createElement("div");  // div with date_time's label and input
            let datetime_label = document.createElement("label");
                datetime_label.htmlFor = "date_time"+i;
                datetime_label.append("Fecha y Hora");
            let datetime_input = document.createElement("input");
                datetime_input.setAttribute("name", "date_time");
                datetime_input.id = "date_time"+i;
                datetime_input.type = "datetime-local";
            datetime_div.append(datetime_label, datetime_input);
        let lugar_div = document.createElement("div");  // row with divs for region, comuna and sector
            lugar_div.className = "flex_row";
            let region_div = document.createElement("div");  // div with region's label and select
                region_div.className = "flex_col";
                let region_div_label = document.createElement("label");
                    region_div_label.htmlFor = "region"+i;
                    region_div_label.append("Region");
                let region_div_select = document.createElement("select");
                    region_div_select.setAttribute("name", "region");
                    region_div_select.id = "region"+i;
                    // the region options will be generated later
                region_div.append(region_div_label, region_div_select);
            let comuna_div = document.createElement("div");  // div with comuna 's label and select
                comuna_div.className = "flex_col";
                let comuna_div_label = document.createElement("label");
                    comuna_div_label.htmlFor = "comuna" + i;
                    comuna_div_label.append("Comuna");
                let comuna_div_select = document.createElement("select");
                    comuna_div_select.setAttribute("name", "comuna");
                    comuna_div_select.id = "comuna" + i;
                    comuna_div_select.innerHTML = "<option>--Elija una Región--</option>"  // you need a region first
                    // as the comuna options depends on the region, they will be generated dynamically
                comuna_div.append(comuna_div_label, comuna_div_select);
            let sector_div = document.createElement("div");  // div with sector's label and input
                sector_div.className = "flex_col";
                let sector_div_label = document.createElement("label");
                    sector_div_label.htmlFor = "sector" + i;
                    sector_div_label.append("Sector");
                let sector_div_select = document.createElement("input");
                    sector_div_select.setAttribute("name", "sector");
                    sector_div_select.id = "sector" + i;
                    sector_div_select.type = "text";
                    sector_div_select.maxLength = 100;
                sector_div.append(sector_div_label, sector_div_select);
            lugar_div.append(region_div, comuna_div, sector_div)
        let avistamiento_div = document.createElement("div");  // row with divs for description and photo
            avistamiento_div.className = "flex_row";
            let avistamiento_text_div = document.createElement("div");  // column with tipo and estado
                avistamiento_text_div.className = "flex_col";
                let avistamiento_text_div_type_label = document.createElement("label");
                    avistamiento_text_div_type_label.htmlFor = "subfilo" + i;
                    avistamiento_text_div_type_label.append("Tipo");
                let avistamiento_text_div_type_select = document.createElement("select");
                    avistamiento_text_div_type_select.id = "subfilo" + i;
                    avistamiento_text_div_type_select.setAttribute("name", "subfilo");
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
                    avistamiento_text_div_state_label.htmlFor = "entity_state"+i;
                    avistamiento_text_div_state_label.append("Estado");
                let avistamiento_text_div_state_select = document.createElement("select");
                    avistamiento_text_div_state_select.id = "entity_state"+i;
                    avistamiento_text_div_state_select.setAttribute("name", "entity_state");
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
            let avistamiento_photo_div = document.createElement("div"); // column with photo
                avistamiento_photo_div.className = "flex_col";
                let avistamiento_photo_div_text = document.createElement("div");
                    avistamiento_photo_div_text.append("Foto");
                let avistamiento_photo_div_div = document.createElement("div");  // column with input and preview
                    avistamiento_photo_div_div.className = "flex_row";
                    let avistamiento_photo_div_input = document.createElement("input");
                        avistamiento_photo_div_input.type = "file";
                        avistamiento_photo_div_input.id = "photo"+i;
                        avistamiento_photo_div_input.setAttribute("name", "photo");
                    let avistamiento_photo_div_preview = document.createElement("div");
                        avistamiento_photo_div_preview.className = "img_preview_div";
                        avistamiento_photo_div_preview.id = "img_preview"+i;
                        let avistamiento_photo_div_preview_img = document.createElement("img");
                            avistamiento_photo_div_preview_img.alt = "Previsualización de la imagen seleccionada";
                            avistamiento_photo_div_preview_img.className = "img_preview_img"
                        avistamiento_photo_div_preview.append(avistamiento_photo_div_preview_img);
                    avistamiento_photo_div_div.append(avistamiento_photo_div_input, avistamiento_photo_div_preview);
                avistamiento_photo_div.append(avistamiento_photo_div_text, avistamiento_photo_div_div)
            avistamiento_div.append(avistamiento_text_div, avistamiento_photo_div);

        new_div.append(datetime_div, lugar_div, avistamiento_div);
    form_main_div.append(new_div);

    // now we can generate the region options
    generate_region_options(i);

    document.getElementById("region"+i).addEventListener('change', function () {display_comuna_options_k(i);})
    document.getElementById("photo"+i).addEventListener('change', function () {display_img_k_preview(i);})

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
        option_element.append(options[key]);

        select_comuna.options.add(option_element);
    }

}

function display_img_k_preview(k) {

    const file_input = document.getElementById("photo"+k);
    const file = file_input.files[0];
    const preview_div = document.getElementById("img_preview"+k);
    const preview_img = preview_div.children[0];

    if (file) {
        const reader = new FileReader();

        preview_img.style.display = "block";

        reader.addEventListener("load", function (e) {
            preview_img.setAttribute("src", e.target.result);  // error, but it works
        })
        reader.readAsDataURL(file_input.files[0]);
    } else {
        preview_img.style.display = "null";
    }

}