#!/usr/bin/python3
# -*- coding: utf-8 -*-

import os
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


def look_for_query(query, key_string):
    query = query + '='
    return query == key_string[0:(len(query))]


info = {}
for key in os.environ['QUERY_STRING'].split('&'):
    if look_for_query('n_per_comuna', key):
        query_bool = key[len('n_per_comuna')+1:]
        if query_bool in ['True', 'true', 'TRUE', '1']:
            info["n_per_comuna"] = db.get_n_avistamientos_per_comuna()
    elif look_for_query('l_comuna_id', key):
        query_id = key[len('l_comuna_id')+1:]
        info["l_comuna_id"] = db.get_avistamientos_listado_on_comuna(query_id)

print(json.dumps(str(info)), file=utf8stdout, end='')
