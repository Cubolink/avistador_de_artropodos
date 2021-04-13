
const form = document.getElementById("nuevos_avistamientos");

form.addEventListener('submit', function (e) {

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
            if (j === 0) {
                if (foto.files[0] === undefined) {
                    messages.push("Por favor, añada al menos 1 foto")
                }
            }
            validate_input(foto, validate_photo,"Por favor, seleccione una foto válida", messages);
        }
        if (row_of_photo.children.length >= 5) {
            messages.push("Máximo de 5 fotos permitidas para un avistamiento");
        }

    }
    // check all the inputs inside the contacto section
    {
        let nombre = document.getElementById("nombre");
        let email = document.getElementById("email");
        let celular = document.getElementById("celular");

        validate_input(nombre, validate_nombre, "Por favor, escriba un nombre de menos de 200 caracteres.", messages);
        validate_input(email, validate_email, "Por favor, escriba un correo válido.", messages);
        validate_numero_de_celular(celular, validate_numero_de_celular, "Por favor, escriba el número con el formato correcto.", messages);
    }

    if (messages.length > 0) {
        console.log(messages);
        e.preventDefault();  // this works too
    }
    // e.preventDefault();
})

function validate_input(input, f_validator, error_message, error_messages_list) {
    if (f_validator(input)) {
        input.className.replace(" wrong_input", "");
        input.className += " correct_input";
    } else {
        error_messages_list.push(error_message)
        input.className.replace(" correct_input", "");
        input.className += " wrong_input";
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
    return 0 < input.value.length <= 200;
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
    let regex = /^\+56 [2|9] \d{4} \d{4}$/;

    return input.value.match(regex) !== null;
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

        // check if month >= 8 and month%2==1, then day === "31" is invalid
        // check if month < 8 and month%2==0, they day === "31" is invalid
        // check if month == 2, then we have to check if the year is a leap-year (bisiesto), depending on that we discard days

        // if something goes false, return false, otherwise we continue till end, and the function returns true normally
    }
    return true;
}

function validate_tipo(input) {
    return input.value !== "";
}

function validate_estado(input) {
    return input.value !== "";
}

function validate_photo(input) {
    const valid_types = ["image/gif", "image/jpeg", "image/png"];

    if (input.files[0] !== undefined) {
        return valid_types.includes(input.files[0]['type']);
    }
    return true;

}
