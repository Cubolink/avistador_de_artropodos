#!/usr/bin/python3
# -*- coding: utf-8 -*-


import cgi
import cgitb
from databases import AvistamientoDB, AvistamientoData

cgitb.enable()

print("Content-type:text/html\r\n\r\n")
utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)

form = cgi.FieldStorage()


class AvistamientoAdapter:
    def __init__(self):
        self.db = AvistamientoDB(host='localhost', user='cc500232_u', password='merosatviv', database='cc500232_db')

    def add_form_data(self, nombre, email, celular,
                      fechas: list, regiones: list, comunas: list, sectores: list,
                      tipos_de_avistamiento: list, estados_de_avistamiento: list,
                      fotos_de_avistamiento_storages: list, contador_de_fotos_de_avistamiento: list):
        """
        Sends the data to the database.

        :param nombre: name of the submitter.
        :param email: email of the submitter.
        :param celular: phone of the submitter.
        :param fechas: list of avistamientos dates.
        :param regiones: list of avistamientos regions.
        :param comunas: list of avistamientos comunas.
        :param sectores: list of avistamientos sectors.
        :param tipos_de_avistamiento: list of avistamientos life being types.
        :param estados_de_avistamiento: list of avistamientos life being states.
        :param fotos_de_avistamiento_storages: list of avistamientos life being photos storages
            (all avistamientos in a single list).
        :param contador_de_fotos_de_avistamiento: list of avistamientos photos counters (to separate the photos).
        :return: None.
        """
        """
        print("nombre:", nombre, "<br>")
        print("email:", email, "<br>")
        print("celular:", celular, "<br>")
        print("<br><br>")

        print("fechas:", fechas, "<br>")
        print("regiones:", regiones, "<br>")
        print("comunas:", comunas, "<br>")
        print("sectores:", sectores, "<br>")
        print("tipos de avistamiento:", tipos_de_avistamiento, "<br>")
        print("estados de avistamiento:", estados_de_avistamiento, "<br>")
        print("fotos de avistamiento:", [foto.filename for foto in fotos_de_avistamiento_storages], "<br>")
        print("contador de fotos:", contador_de_fotos_de_avistamiento, "<br><br>")"""

        # separamos en avistamientos
        avistamientos = []
        assert len(fechas) == len(regiones) == len(comunas) == len(sectores) == len(tipos_de_avistamiento) == \
               len(estados_de_avistamiento) == len(contador_de_fotos_de_avistamiento)
        numero_de_avistamientos = len(fechas)

        first_avistamiento_foto_index = 0
        for i in range(numero_de_avistamientos):
            last_avistamiento_foto_index = first_avistamiento_foto_index + contador_de_fotos_de_avistamiento[i]
            avistamiento = AvistamientoData(nombre=nombre, email=email, celular=celular,
                                            dia_hora=fechas[i], region=regiones[i], comuna=comunas[i],
                                            sector=sectores[i],
                                            tipo=tipos_de_avistamiento[i], estado=estados_de_avistamiento[i],
                                            fotos=fotos_de_avistamiento_storages[first_avistamiento_foto_index:
                                                                                 last_avistamiento_foto_index])

            if avistamiento.fotos[-1].filename == '':
                avistamiento.fotos = avistamiento.fotos[0:-1]  # the last element is empty because it wasn't sent
            avistamientos.append(avistamiento)
            first_avistamiento_foto_index = last_avistamiento_foto_index

            # print(avistamiento)
            # print("<br><br>")
        # print(avistamientos)

        html_error_msg = ""
        for i in range(len(avistamientos)):
            success = self.db.add_new_avistamiento(avistamientos[i])  # add the avistamiento
            if not success:
                html_error_msg += f"""<div><h5>Hubo errores en el {i+1}° avistamiento enviado :c.</h5>"""
                for msg in avistamientos[i].validation_error_messages:
                    html_error_msg += f"""<p>{msg}</p>"""
                html_error_msg += """</div>"""
        return html_error_msg

# print(form.keys())
# print("<br><br>")


db = AvistamientoAdapter()
html_ans = ""
try:
    html_ans = db.add_form_data(
        nombre=form['nombre'].value,
        email=form['email'].value,
        celular=form['celular'].value,

        fechas=[fecha.value for fecha in form['dia-hora-avistamiento']]
        if (type(form['dia-hora-avistamiento']) is list) else [form['dia-hora-avistamiento'].value],

        regiones=[region.value for region in form['region']] if (type(form['region']) is list) else [form['region'].value],

        comunas=[comuna.value for comuna in form['comuna']] if (type(form['comuna']) is list) else [form['comuna'].value],

        sectores=[sector.value for sector in form['sector']] if (type(form['sector']) is list) else [form['sector'].value],

        tipos_de_avistamiento=[tipo.value for tipo in form['tipo-avistamiento']]
        if (type(form['tipo-avistamiento']) is list) else [form['tipo-avistamiento'].value],

        estados_de_avistamiento=[estado.value for estado in form['estado-avistamiento']]
        if (type(form['estado-avistamiento']) is list) else [form['estado-avistamiento'].value],

        fotos_de_avistamiento_storages=form['foto-avistamiento'],

        contador_de_fotos_de_avistamiento=[int(contador_foto.value) for contador_foto in form['hidden-photo-counter']]
        if (type(form['hidden-photo-counter']) is list) else [int(form['hidden-photo-counter'].value)]
    )
except KeyError:
    html_ans = "KeyError"


def write_modal_msg_script():
    if html_ans == "":
        return """
        <script>display_success_msg();</script>
        """
    elif html_ans == "KeyError":
        return f"""
        <script>
            function write_errors() {{
                let modal_environment = document.getElementById("success_msg");
                modal_environment.className = "modal_environment";
                let modal_box = document.createElement("div");
                modal_box.className = "headband modal_box";
                    let msg_div = document.createElement("div");
                        msg_div.innerHTML =
                            "<h2>Error grave en el formulario. No contiene todos los inputs esperados :o</h2><br><br>";
                            
                    let continue_button = document.createElement("button");
                        continue_button.type = "button";
                        continue_button.className = "accept_button";
                        continue_button.append("Continuar");
                        continue_button.addEventListener('click', function () {{
                            modal_environment.innerHTML = "";
                            modal_environment.className = "";
                            location.href = "index.py";
                        }}
                        )
                modal_box.append(msg_div, continue_button);
                modal_environment.append(modal_box);
            }}
            write_errors();
        </script>
        """
    else:
        return f"""
        <script>
            function write_errors() {{
                let modal_environment = document.getElementById("success_msg");
                modal_environment.className = "modal_environment";
                let modal_box = document.createElement("div");
                modal_box.className = "headband modal_box";
                    let msg_div = document.createElement("div");
                        msg_div.innerHTML = "<h3>Algunos de sus formularios no pudieron ser enviados</h3><br><br> {html_ans}"
                    let continue_button = document.createElement("button");
                        continue_button.type = "button";
                        continue_button.className = "accept_button";
                        continue_button.append("Continuar");
                        continue_button.addEventListener('click', function () {{
                            modal_environment.innerHTML = "";
                            modal_environment.className = "";
                            location.href = "index.py";
                        }}
                        )
                modal_box.append(msg_div, continue_button);
                modal_environment.append(modal_box);
            }}
            write_errors();
        </script>
        """


"""
print(form)
print("<br><br><br>")
print("nombre:", form['nombre'], "<br>")
print("email:", form['email'], "<br>")
print("celular:", form['celular'], "<br>")
print("<br><br>")

print("fechas:", form['dia-hora-avistamiento'], "<br>")
print("regiones:", form['region'], "<br>")
print("comunas:", form['comuna'], "<br>")
print("sectores:", form['sector'], "<br>")
print("tipos de avistamiento:", form['tipo-avistamiento'], "<br>")
print("estados de avistamiento:", form['estado-avistamiento'], "<br>")
print("fotos de avistamiento:", form['foto-avistamiento'], "<br>")
print("contador de fotos:", form['hidden-photo-counter'])
"""

print(f"""
<!--Author: Joaquín Cruz Cancino-->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Avistadapp</title>
    <link rel="stylesheet" href="../styles/styles.css">
    <link rel="stylesheet" href="../styles/styles2.css">
    <link rel="stylesheet" href="../styles/modals.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
            integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
            crossorigin="anonymous"></script>
</head>
<body>
<!--Título-->
<div class="welcome">
    Bienvenido a la Avistadapp.
</div>
<div id="success_msg"></div>

<!--Descripción-->
<div class="description">
    La Avistadapp permite publicar un avistamiento de un insecto,
    así como ver otros avistamientos que han hecho otros usuarios.
</div>

<!--Tabla de avistamientos, muestra los últimos 5-->
<div>
    <div class="description">
        Revisa los últimos avistamientos!
    </div>
    <table class="demo_table">
        <tr>
            <th class="demo_table_heads">Fecha</th>
            <th class="demo_table_heads disappear_lv2">Comuna</th>
            <th class="demo_table_heads disappear_lv1">Sector</th>
            <th class="demo_table_heads disappear_lv1">Tipo</th>
            <th class="demo_table_heads">Foto</th>
        </tr>
        <tr>
            <td colspan="5" id="add_avistamientos_row">
                <div class="headband" onclick="display_new_avistamiento_form()"> <!--Cinta de añadir avistamiento-->
                    <img src="../images/add.webp" class="icon" alt="add_element_img">
                    <div> <!--Texto descriptivo de la cinta-->
                        Añadir Avistamiento
                    </div>
                </div>

                <form name="nuevos_avistamientos" id="nuevos_avistamientos" method="post" action="add_new_avistamiento.py" enctype="multipart/form-data"> </form>

            </td>
        </tr>
        <tr>
            <th colspan="5" class="always_visible">
                <a href="avistamientos.py" class="headband">
                    <div>
                        <!--Imagen-->
                    </div>
                    <div> <!--Texto de la cinta-->
                        Ver listado de avistamientos ↓ ↓
                    </div>
                </a>
            </th>
        </tr>

    </table>
</div>
<a href="../templates/estadísticas.html">
    <div class="box round_square">
        <div class="center bold">Ver estadísticas.</div>
    </div>
</a>

<div class="credits">
    By Cubolink
</div>

<script src="../scripts/functions.js"></script>
<script src="../scripts/validations.js"></script>
{write_modal_msg_script()}

</body>
</html>
""", file=utf8stdout)
