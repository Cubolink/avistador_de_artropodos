#!/usr/bin/python3
# -*- coding: utf-8 -*-

import cgi
import cgitb
import mysql.connector

cgitb.enable()
utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)
print("Content-type:text/html\r\n\r\n")

db = mysql.connector.connect(host='localhost', user='cc500232_u', password='merosatviv', database='cc500232_db')
cursor = db.cursor()
cursor.execute("""
SELECT * FROM comuna
""")
ans = cursor.fetchall()
h_res = ""
for t in ans:
    h_res += f"""<p>({t[0]}, {t[1]}, {t[2]})</p>"""


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
<body>{h_res}</body></html>""", file=utf8stdout)
