#!/usr/bin/python3
# -*- coding: utf-8 -*-
import mysql.connector
import sys

if __name__ == "__main__":
    if (len(sys.argv) <= 1) or (('-create' not in sys.argv) and ('-load' not in sys.argv)):
        print("database_init.py options")
        print("\t-create to initialize database")
        print("\t-load to load the regiones and comunas into the tables")
        sys.exit()

    print("Conecting to database")
    db = mysql.connector.connect(
        host="localhost",  # 127.0.0.1
        user="root",
        password=""
    )

    if '-create' in sys.argv:
        print("Creating schemas and database")
        with open('tarea2.sql', 'r') as sql_file:
            cursor = db.cursor()
            cursor.execute(sql_file.read(), multi=True).send(None)
            cursor.close()
        print("Creation ended successfully!!")

    if '-load' in sys.argv:
        print("Loading regiones and comunas into the tables")
        with open('region-comuna.sql', 'r') as sql_file:
            cursor = db.cursor()
            cursor.execute(sql_file.read(), multi=True)
            db.commit()
            cursor.close()
        print("Loading ended successfully!! or not??")
        print("For some reason, this load doesn't work, so try to execute those files in the database")
