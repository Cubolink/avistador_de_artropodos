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

avistamiento_id = 0
for key in os.environ['QUERY_STRING'].split('&'):
    if 'id=' == key[0:3]:
        avistamiento_id = key[3:]

info = db.get_avistamiento_detalles(avistamiento_id)


def put(title, content):
    return f"""
        <div class="bold">{title}</div>
        <div>{content}</div>
    """


def add_photos():
    s = ""
    for i in range(len(info["rutas"])):
        ruta = info["rutas"][i]
        filename = info["filenames"][i]
        foto = f"""
            <img alt="{filename}" id="img{i}" src="..\\{ruta}-small" onclick="display_big_img('img{i}')">
        """
        s += foto
    return s


print(f"""
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Avistadapp - Ver Avistamiento</title>
    <link rel="stylesheet" href="../styles/styles.css">
    <link rel="stylesheet" href="../styles/styles2.css">
    <link rel="stylesheet" href="../styles/modals.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
            integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
            crossorigin="anonymous"></script>
</head>
<body>
<div class="box round_square flex_col">
    <div class="welcome round_square">Información del Avistamiento</div>

    <div id="fecha" class="row">{put("Fecha: ", info["fecha"].strftime("%Y-%m-%d %H:%M"))}</div>
    <br>

    <div class="bold big">Lugar: </div>
    <div class="flex_row space">
        <div id="region" class="row">{put("Region: ", info["region"])}</div>
        <div id="comuna" class="row">{put("Comuna: ", info["comuna"])}</div>
        <div id="sector" class="row">{put("Sector: ", info["sector"])}</div>
    </div>
    <br>

    <div class="bold big">Información: </div>
    <div class="flex_row space">
        <div id="tipo" class="row">{put("Tipo: ", info["tipo"])}</div>
        <div id="estado" class="row">{put("Estado: ", info["estado"])}</div>
    </div>
    <div class="flex_col space">
        <div id="fotos_text" class="bold">Fotos: </div>
        <div id="fotos" class="flex_row">{add_photos()}</div>
    </div>
    <br>

    <div class="bold big">Contacto: </div>
    <div class="flex_row space">
        <div id="nombre" class="row">{put("Nombre: ", info["nombre"])}</div>
        <div id="email" class="row">{put("Correo ", info["email"])}</div>
        <div id="celular" class="row">{put("Celular", info["celular"])}</div>
    </div>
</div>
<div class="flex_row">
    <a href="avistamientos.py">
        <div class="box round_square bold">
            Volver al listado de avistamientos.
        </div>
    </a>
    <a href="index.py">
        <div class="box round_square bold">
            Ir a la página principal.
        </div>
    </a>
</div>

<script src="../scripts/particular_avistamiento_funs.js"></script>
</body>
</html>
""", file=utf8stdout)
