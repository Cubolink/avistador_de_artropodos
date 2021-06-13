#!/usr/bin/python3
# -*- coding: utf-8 -*-

import cgi
import cgitb
import json
import sys

from databases import AvistamientoDB
cgitb.enable()
utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)
print("Content-Type: application/json\n")
# print("Content-Type: text/plain\n")

db = AvistamientoDB(host='localhost', user='cc500232_u', password='merosatviv', database='cc500232_db')
# db = AvistamientoDB(host='localhost', user='root', password='', database='cc500232_db')

info = db.get_avistamiento_time_series()
info = {
    "time_series": info[0],
    "count_tipo": info[1],
    "time_series_by_estado": info[2]
}

print(json.dumps(str(info)), file=utf8stdout, end='')
