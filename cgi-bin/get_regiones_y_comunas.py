#!/usr/bin/python3
# -*- coding: utf-8 -*-

import cgi
import cgitb
import mysql.connector
import json

cgitb.enable()


class RegionesYComunas:
    def __init__(self):
        self.d = {}

    def add_tuple(self, t: tuple):
        region = t[0]
        comuna = t[1]
        if t[0] not in self.d.keys():
            self.d[region] = {"NombreRegion": region,
                              "comunas": []}
        self.d[region]['comunas'].append(comuna)

    def get_dict(self):
        formatted_dict = []
        for key in self.d.keys():
            formatted_dict.append(self.d[key])
        return formatted_dict


db = mysql.connector.connect(
    host="localhost",
    user="cc5002",
    password="programacionweb"
)
cursor = db.cursor()

cursor.execute("""
SELECT region.nombre, comuna.nombre FROM tarea2.region JOIN tarea2.comuna ON comuna.region_id = region.id;
""")
tuples = cursor.fetchall()
reg = RegionesYComunas()
for ti in tuples:
    reg.add_tuple(ti)

print("Content-Type: application/json\n")
utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)
# print(*reg.get_dict(), sep=", ", file=utf8stdout)
dicts = reg.get_dict()

s = ""
for dic in dicts:
    s += json.dumps(str(dic)) + ","
print(s[:-1], file=utf8stdout)

