/**
 * Validates the new avistamiento form.
 */
function is_valid_form(){
    console.log("validating");
    const avistamiento_div = document.getElementById("nuevos_avistamientos")
    let n = avistamiento_div.children[0].children.length;  // number of avistamientos to check

    let messages = [];


    // check all inputs inside the avistamiento section
    for (let k=0; k<n; k++) {
        let region = document.getElementById("region"+k);
        let comuna = document.getElementById("comuna"+k);
        let sector = document.getElementById("sector"+k);
        let dia_hora = document.getElementById("dia-hora-avistamiento"+k);
        let tipo = document.getElementById("tipo-avistamiento"+k);
        let estado = document.getElementById("estado-avistamiento"+k);

        validate_input(region, validate_region,"Por favor, seleccione una región de la lista.", messages);
        validate_input(comuna, validate_comuna,"Por favor, seleccione una comuna de la lista.", messages);
        validate_input(sector, validate_sector,"Por favor, escriba un sector válido.", messages);
        validate_input(dia_hora, validate_dia_hora,"Por favor, escriba una fecha y hora en el formato año-mes-dia hora:minuto.", messages);
        validate_input(tipo, validate_tipo,"Por favor, seleccione un tipo de la lista.", messages);
        validate_input(estado, validate_estado,"Por favor, seleccione un estado de la lista.", messages);

        let row_of_photo = document.getElementById("row_of_photo_divs"+k);
        for (let j = 0; j < row_of_photo.children.length; j++) {
            let foto = document.getElementById("foto-avistamiento"+k+"_"+j);
            validate_input(foto, validate_photo,"Por favor, seleccione una "+(j+1)+"° foto válida", messages);
        }
        validate_input(row_of_photo, validate_photo_row, "Por favor, ingrese entre 1 y 5 fotos", messages);

    }
    // check all the inputs inside the contacto section
    {
        let nombre = document.getElementById("nombre");
        let email = document.getElementById("email");
        let celular = document.getElementById("celular");

        validate_input(nombre, validate_nombre, "Por favor, escriba un nombre de menos de 200 caracteres.", messages);
        validate_input(email, validate_email, "Por favor, escriba un correo válido.", messages);
        validate_input(celular, validate_numero_de_celular, "Por favor, escriba el número con el formato correcto.", messages);
    }

    let error_messages = document.getElementById('form_error_messages');  // div with the submit button
        error_messages.innerHTML = "";  // clear errors
    if (messages.length > 0) {
        console.log("Errors");
        console.log(messages);
        for (let i=0; i<messages.length; i++) {
            let paragraph_error = document.createElement('li');
            paragraph_error.append(messages[i])
            error_messages.append(paragraph_error)
        }
        return false;
    }
    console.log("valid")
    return true;
}
const form = document.getElementById("nuevos_avistamientos");

/**
 * Function with common behavior of input validations.
 * It takes the input to validate and the function validator, and uses it to validate the input.
 * @param input The html input to validate.
 * @param f_validator The validator function.
 * @param error_message The error message to display if the validation fails.
 * @param error_messages_list The list where to push error messages.
 */
function validate_input(input, f_validator, error_message, error_messages_list) {
    if (f_validator(input)) {
        input.classList.remove("wrong_input", "unchecked_input");
        input.classList.add("correct_input");
    } else {
        error_messages_list.push(error_message)
        input.classList.remove("correct_input", "unchecked_input");
        input.classList.add("wrong_input");
    }
}

function validate_region(input) {
    return input.value !== "";
}

function validate_comuna(input) {
    return input.value !== "";
}

function validate_sector(input) {
    return input.value.length <= 100;
}

function validate_nombre(input) {
    return (0 < input.value.length) && (input.value.length <= 200);
}

function validate_email(input) {
    // regex explanation:
    // ^$ start and end respectively
    // [^\s@]+ means an expression with exceptional unicode characters (blank, tab, etc) with an @, is not allowed.
    // @ is required after the previous expression
    // [^\a@]+ again, we expect a normal expression, the + indicates it's possible to have it at least once
    let regex = /^[^\s@]+@[^\s@]+$/;
    return input.value.match(regex) !== null;
}

function validate_numero_de_celular(input) {
    let regex = /^\+569\d{8}$/;
    let text = input.value.replace(/\s+/g, '');  // remove spaces

    return text === "" || text.match(regex) !== null;
}

function validate_dia_hora(input) {
    // dd-mm-yyyy hh:mm

    // explanation (in spanish because mucho texto)
    /*

    ^$ para indicar el inicio y fin de la palabra respectivamente
    \d{4} número de 4 dígitos para el año
    mes: la notación es la misma que el día, solo que son válidas menos combinaciones
    día: 0?[1-9] para decir que es válido un 0 si es que va acompañado con un dígito del 1 al 9
         [12][0-9] para decir que es válido un dígito del 1 al 2, acompañado un dígito del 1 al 9
         3[01] para decir que es válido el 3 cuando está acompañado del 0 o un 1
    \- para indicar que debe haber un -

    Un espacio entre esta parte y la siguiente, para separar la fecha de la hora. Algunos navegadores usan T, así que también está esa posibilidad.
    La hora sigue el mismo formato ya explicado, pero con el : entre medio. Note que va del 00:00 al 23:59
    Usamos () para agrupar además, y poder recolectar esos datos

    */
    let regex = /^(\d{4})[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])[ |T]([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/

    if (input.value.match(regex) === null) {  // doesn't match the date format
        return false;
    } else {
        // it's a valid format, we have to check now if is not like february 31, but let's let that for other time
        let d = input.value.match(regex);  // d[1] is the year, d[2] the month, ... d[5] the minutes!, and d[0] the whole expr
        let day = parseInt(d[3]), month = parseInt(d[2]), year = parseInt(d[1]);

        if ((month >= 8) && (month % 2 === 1)) {
            // all odd months have 30 days after august
            if (day === 31) {
                return false;
            }
        } else if ((month <= 7) && (month % 2 === 0)) {
            // all even months have 30 days until july, except for february
            if (day === 31) {
                return false
            } else if (month === 2) {
                // check for leap-year (bisiesto)

                let leap_year = ((year % 4 === 0) &&  // divisible by 4
                    ((year % 100 !== 0) || (year % 400 === 0)));  // but not by 100, unless it's divisible by 400

                if (day > 29 || (!leap_year && day > 28)) {
                    return false;
                }
            }
        }
    }
    return true;
}

function validate_tipo(input) {
    return input.value !== "";
}

function validate_estado(input) {
    return input.value !== "";
}


/**
 * Validates a photo input, checking the file is on a valid format. If there's no photo, is actually valid.
 * @param input An html file input.
 * @returns {boolean} true if it's a valid format, or there's no photo. False otherwise.
 */
function validate_photo(input) {
    const valid_types = ["image/gif", "image/jpeg", "image/png"];

    if (input.files[0] !== undefined) {
        return valid_types.includes(input.files[0]['type']);
    }
    return true;  // there's no photo to validate
}

/**
 * Validates a photo row, not checking each photo input, but checking the amount of inputs.
 * @param row An html section
 * @returns {boolean} true if there are between 1 and 5 photos.
 */
function validate_photo_row(row) {
    let cont = 0;
    for (let i = 0; i < row.children.length; i++) {
        let input = row.children[i].children[0];  // the input is the first child of the i-th col
        for (let j = 0; j < input.files.length; j++) {
            // there may be more files per input, even if it's not designed to
            if (input.files[j] !== undefined) {
                cont++;
            }
        }
    }
    return (0 < cont) && (cont <= 5);
}
