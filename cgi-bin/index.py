#!/usr/bin/python3
# -*- coding: utf-8 -*-

import os
import cgi
import cgitb
from datetime import datetime
from databases import AvistamientoDB

cgitb.enable()
utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)
print("Content-type:text/html\r\n\r\n")
# print("Content-Type: text/plain\n")

db = AvistamientoDB(host='localhost', user='cc500232_u', password='merosatviv', database='cc500232_db')
info = db.get_last_avistamientos_preview(5)


def write_rows():
    s = ""
    for i in range(len(info)):
        row = info[i]
        if i == 0:
            s += f"""
                <tr>
                    <td class="demo_table_date_col">{row["fecha"].strftime("%Y-%m-%d %H:%M")}</td>
                    <td class="demo_table_info_cols demo_table_info_cols_top demo_table_info_cols_left disappear_lv2">{row["comuna"]}</td>
                    <td class="demo_table_info_cols demo_table_info_cols_top disappear_lv1">{row["sector"]}</td>
                    <td class="demo_table_info_cols demo_table_info_cols_top disappear_lv1">{row["tipo"]}</td>
                    <td class="demo_table_img_col"><img src="{row["ruta"]}-small" alt="{row["filename"]}" class="img_table"></td>
                </tr>
                """
        elif i == len(info) - 1:
            s += f"""
                    <tr>
                        <td class="demo_table_date_col">{row["fecha"].strftime("%Y-%m-%d %H:%M")}</td>
                        <td class="demo_table_info_cols demo_table_info_cols_bottom demo_table_info_cols_left disappear_lv2">{row["comuna"]}</td>
                        <td class="demo_table_info_cols demo_table_info_cols_bottom disappear_lv1">{row["sector"]}</td>
                        <td class="demo_table_info_cols demo_table_info_cols_bottom disappear_lv1">{row["tipo"]}</td>
                        <td class="demo_table_img_col"><img src="{row["ruta"]}-small" alt="{row["filename"]}" class="img_table"></td>
                    </tr>
                """
        else:
            s += f"""
                    <tr>
                        <td class="demo_table_date_col">{row["fecha"].strftime("%Y-%m-%d %H:%M")}</td>
                        <td class="demo_table_info_cols demo_table_info_cols_left disappear_lv2">{row["comuna"]}</td>
                        <td class="demo_table_info_cols disappear_lv1">{row["sector"]}</td>
                        <td class="demo_table_info_cols disappear_lv1">{row["tipo"]}</td>
                        <td class="demo_table_img_col"><img src="{row["ruta"]}-small" alt="{row["filename"]}" class="img_table"></td>
                    </tr>
                """

    return s


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
        {write_rows()}
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

</body>
</html>
""", file=utf8stdout)
