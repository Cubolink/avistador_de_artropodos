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

page = 1
for key in os.environ['QUERY_STRING'].split('&'):
    if 'page=' == key[0:5]:
        page = int(key[5:])

info = db.get_avistamientos_listado((page-1)*5, 6)


def write_row(row_number):
    if row_number >= len(info):
        return ""
    row_info = info[row_number]
    s = f"""
    <tr id="row{row_number+1}" class="space clickable_row" onclick="open_row({row_info["avistamiento_id"]})">
        <td class="col space">{row_info["fecha"].strftime("%Y-%m-%d %H:%M")}</td>
        <td class="col space">{row_info["comuna"]}</td>
        <td class="col space">{row_info["sector"]}</td>
        <td class="col space">{row_info["nombre"]}</td>
        <td class="col space">{row_info["n_detalles"]}</td>
        <td class="col space">{row_info["n_fotos"]}</td>
    </tr>
    """
    return s


def write_rows():
    s = ""
    for i in range(min(5, len(info))):
        s += write_row(i)
    return s


def insert_previous_button():
    if page == 1:
        return ""
    return """
    <button onclick="previous_page()">
        Anterior
    </button>
    """


def insert_next_button():
    # for info, we asked 6 rows, but displayed 5.
    if len(info) >= 6:  # If info received actually 6, then there's more info to display in a next page
        return """
        <button onclick="next_page()">
            Siguiente
        </button>
        """
    return ""


print(f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Avistadapp - Listado</title>
    <link rel="stylesheet" href="../styles/styles.css">
    <link rel="stylesheet" href="../styles/styles2.css">
</head>
<body>

<div class="welcome">
    Listado de Avistamientos
</div>

<div class="row">
    {insert_previous_button()}
    <table id="main_table" class="box round_square center">
        <tr id="row0">
            <th>Fecha</th>
            <th>Comuna</th>
            <th>Sector</th>
            <th>Nombre Contacto</th>
            <th>Total Avistamientos</th>
            <th>Total Fotos</th>
        </tr>
        {write_rows()}
    </table>
    {insert_next_button()}
</div>
<a href="index.py">
    <div class="box round_square">
        <div class="center">Ir a la página principal.</div>
    </div>
</a>

<script>
    function open_row(row) {{
        window.location.href = "particular_avistamiento.py?id="+row;
    }}
    
    function previous_page() {{
        const urlParams = new URLSearchParams(window.location.search);
        let current_page = urlParams.get('page');
        if (current_page === null) {{
            return;
        }} else {{
            current_page = parseInt(current_page)
            if (current_page <= 1) {{
                return;  // there is no previous page
            }}
            location.href = 'avistamientos.py?page=' + (current_page-1).toString()
        }}
    }}
    
    function next_page() {{
        const urlParams = new URLSearchParams(window.location.search);
        let current_page = urlParams.get('page');
        if (current_page === null) {{
            current_page = 1
        }} else {{
            current_page = parseInt(current_page)
        }}
        
        location.href = 'avistamientos.py?page=' + (current_page+1).toString()
        
    }}
</script>
</body>
</html>
""", file=utf8stdout)
