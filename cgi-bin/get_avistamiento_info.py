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
if len(sys.argv) <= 1:
    sys.exit()

avistamiento_id = int(sys.argv[1])
info = db.get_avistamiento_detalles(avistamiento_id)

print(json.dumps(str(info)), file=utf8stdout, end='')
