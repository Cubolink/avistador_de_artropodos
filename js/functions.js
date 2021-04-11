//document.getElementById("select_region").addEventListener("click", display_region_options);
//document.getElementById("select_region").addEventListener("change", display_comuna_options);
// Variable from https://codepen.io/amigaviole/pen/NQOpKM,
// Uploader: yani (@amigaviole) (https://codepen.io/amigaviole)

const RegionesYComunas2 = [
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


function display_new_avistamiento_form() {

    // the form to add avistamientos
    let add_elements_form = document.getElementById("nuevos_avistamientos");

    if (add_elements_form.children.length === 0) {
        let form_input_div = document.createElement("div");
        let submit_form_button = document.createElement("button"); submit_form_button.type = "submit";
        submit_form_button.append("Enviar Formulario")

        add_elements_form.appendChild(form_input_div);
        add_elements_form.appendChild(submit_form_button);
    }
    let form_main_div = add_elements_form.children[0];

    // Create the avistamiento 's div
    // based on the add_avistamiento_form.html, I couldn't find a way to simply append it
    const i = add_elements_form.children[0].children.length;

    let new_div = document.createElement("div");
        new_div.className = "avistamiento";

        let datetime_div = document.createElement("div");
            let datetime_label = document.createElement("label");
                datetime_label.htmlFor = "date_time"+i;
                datetime_label.append("Fecha y Hora");
            let datetime_input = document.createElement("input");
                datetime_input.id = "date_time"+i;
                datetime_input.type = "datetime-local";
            datetime_div.append(datetime_label, datetime_input);
        let lugar_div = document.createElement("div");
            lugar_div.className = "flex_row";
            let region_div = document.createElement("div");
                let region_div_label = document.createElement("label");
                    region_div_label.htmlFor = "select_region"+i;
                    region_div_label.append("Region");
                let region_div_select = document.createElement("select");
                    region_div_select.id = "select_region"+i;
                region_div.append(region_div_label, region_div_select);
            let comuna_div = document.createElement("div");
                let comuna_div_label = document.createElement("label");
                    comuna_div_label.htmlFor = "select_comuna" + i;
                    comuna_div_label.append("Comuna");
                let comuna_div_select = document.createElement("select");
                    comuna_div_select.id = "select_comuna" + i;
                comuna_div.append(comuna_div_label, comuna_div_select);
            let sector_div = document.createElement("div");
                let sector_div_label = document.createElement("label");
                    sector_div_label.htmlFor = "sector" + i;
                    sector_div_label.append("Sector");
                let sector_div_select = document.createElement("input");
                    sector_div_select.id = "sector" + i;
                    sector_div_select.type = "text";
                    sector_div_select.maxLength = 100;
                sector_div.append(sector_div_label, sector_div_select);
            lugar_div.append(region_div, comuna_div, sector_div)
        let avistamiento_div = document.createElement("div");
            avistamiento_div.className = "flex_row";
            let avistamiento_text_div = document.createElement("div");
                avistamiento_text_div.className = "flex_col";
                let avistamiento_text_div_type_label = document.createElement("label");
                    avistamiento_text_div_type_label.htmlFor = "type_family_or_whatever" + i;
                    avistamiento_text_div_type_label.append("Tipo");
                let avistamiento_text_div_type_select = document.createElement("select");
                    avistamiento_text_div_type_select.id = "type_family_or_whatever" + i;
                    let o1 = document.createElement("option"); o1.append("Arácnido")
                    let o2 = document.createElement("option"); o2.append("Insecto")
                    let o3 = document.createElement("option"); o3.append("Teseracto xd")
                    let o4 = document.createElement("option"); o4.append("otros")
                    avistamiento_text_div_type_select.append(o1, o2, o3, o4);
                let avistamiento_text_div_state_label = document.createElement("label");
                    avistamiento_text_div_state_label.htmlFor = "entity_state";
                    avistamiento_text_div_state_label.append("Estado");
                let avistamiento_text_div_state_select = document.createElement("select");
                    avistamiento_text_div_state_select.id = "entity_state";
                    let oo1 = document.createElement("option"); oo1.append("Vivo");
                    let oo2 = document.createElement("option"); oo2.append("Muerto");
                    let oo3 = document.createElement("option"); oo3.append("Desconocido");
                    avistamiento_text_div_state_select.append(oo1, oo2, oo3);
                avistamiento_text_div.append(
                    avistamiento_text_div_type_label,
                    avistamiento_text_div_type_select,
                    avistamiento_text_div_state_label,
                    avistamiento_text_div_state_select
                )
            let avistamiento_photo_div = document.createElement("div");
                avistamiento_photo_div.className = "flex_col";
                let avistamiento_photo_div_text = document.createElement("div");
                    avistamiento_photo_div_text.append("Foto");
                let avistamiento_photo_div_div = document.createElement("div");
                    let avistamiento_photo_div_input = document.createElement("input");
                        avistamiento_photo_div_input.type = "file";
                    avistamiento_photo_div_div.append(avistamiento_photo_div_input);
                avistamiento_photo_div.append(
                    avistamiento_photo_div_text,
                    avistamiento_photo_div_div
                    )
            avistamiento_div.append(avistamiento_text_div, avistamiento_photo_div);

        new_div.append(datetime_div, lugar_div, avistamiento_div);
    form_main_div.append(new_div);
    generate_region_options(i);
    document.getElementById("select_region"+i).addEventListener('change', function () {display_comuna_options_k(i);})

}

function generate_region_options(k) {
    console.log("Generating region Options");

    let options = document.getElementById("select_region"+k);

    options.innerHTML = "<option value=\"\">--Elija una Region--</option>";

    for (let i = 0; i < RegionesYComunas2.length; i++) {
        let option = document.createElement("option");
        option.value = RegionesYComunas2[i]["NombreRegion"];
        option.append(RegionesYComunas2[i]["NombreRegion"]);

        options.append(option);
    }

}

function display_region_options() {
    console.log("Holamundo");

    let options = document.getElementById("select_region");
    options.removeEventListener("click", display_region_options)

    options.innerHTML = "<option value=\"\">--Elija una Region--</option>";

    for (let i = 0; i < RegionesYComunas2.length; i++) {
        let option = document.createElement("option");
        option.value = RegionesYComunas2[i]["NombreRegion"];
        option.append(RegionesYComunas2[i]["NombreRegion"]);

        options.append(option);
    }

}

function display_comuna_options() {
    display_comuna_options_k('');
}

function display_comuna_options_k(k) {
    console.log("Displaying comuna options, k="+k);
    let select_region = document.getElementById("select_region"+k);
    let select_comuna = document.getElementById("select_comuna"+k);

    select_comuna.innerHTML = "<option value=\"\">--Elija una Comuna--</option>";

    let options = [];
    let i = 0;
    while (i<RegionesYComunas2.length) {
        let region = RegionesYComunas2[i];

        if (region["NombreRegion"] === select_region.value) {
            options = region["comunas"];
            break;
        }

        i++;
    }

    for (let key in options) {
        let option_element = document.createElement("option");
        option_element.value = options[key];
        option_element.append(options[key]);

        select_comuna.options.add(option_element);
    }

}
