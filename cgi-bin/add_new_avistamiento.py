#!/usr/bin/python3
# -*- coding: utf-8 -*-


import cgi
import cgitb
from databases import Avistamiento
cgitb.enable()

print("Content-type:text/html\r\n\r\n")
utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)

avistamiento_dv = Avistamiento(host='localhost', user='cc5002', password='programacionweb', database='tarea2')

form = cgi.FieldStorage(keep_blank_values=1)  # empty inputs like sectors are send like empty strings
# we have to consider that, because of this, the empty files input also have empty strings

data = (
    form['nombre']
)

print(form)
print("<br><br><br>")
print("nombre:", form['nombre'], "<br>")
print("email:", form['email'], "<br>")
print("email:", form['celular'], "<br>")
print("<br><br>")

print("fechas:", form['dia-hora-avistamiento'], "<br>")
print("regiones:", form['region'], "<br>")
print("comunas:", form['comuna'], "<br>")
print("sectores:", form['sector'], "<br>")
print("tipos de avistamiento:", form['tipo-avistamiento'], "<br>")
print("estados de avistamiento:", form['estado-avistamiento'], "<br>")
print("fotos de avistamiento:", form['foto-avistamiento'], "<br>")
print("contador de fotos:", form['hidden-photo-counter'])
