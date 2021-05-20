#!/usr/bin/python3
# -*- coding: utf-8 -*-
import hashlib
import os
from datetime import datetime

import mysql.connector
import filetype


class AvistamientoData:
    """
    A class to define the data structure that will receive the Avistamientos class.
    """

    def __init__(self, nombre, email, celular,
                 dia_hora, region, comuna, sector,
                 tipo, estado, fotos):
        self.nombre = nombre
        self.email = email
        self.celular = celular
        self.dia_hora = dia_hora
        self.region = region
        self.comuna = comuna
        self.sector = sector
        self.tipo = tipo
        self.estado = estado
        self.fotos = fotos
        self.stored_foto_filenames = []  # when validating, we store the photos with hash filenames

    def __validate_nombre(self):
        is_valid = type(self.nombre) is str and len(self.nombre) <= 100
        print("\n<br>nombre", ("is_valid" if is_valid else "not valid"))
        return is_valid

    def __validate_email(self):
        is_valid = type(self.nombre) is str and len(self.nombre) <= 100
        print("\n<br>email", ("is_valid" if is_valid else "not valid"))
        return is_valid

    def __validate_celular(self):
        is_valid = type(self.nombre) is str and len(self.nombre) <= 15
        print("\n<br>celular", ("is_valid" if is_valid else "not valid"))
        return is_valid

    def __validate_dia_hora(self):
        try:
            if type(self.dia_hora) is str:
                datetime.strptime(self.dia_hora, '%Y-%m-%d %H:%M')
                return True
            return False
        except ValueError:
            return False

    def __validate_region(self, cursor):
        if type(self.region) is str:
            # check if that region is on the database
            cursor.execute(f"""
                SELECT nombre FROM tarea2.region WHERE nombre='{self.region}';
            """)
            ans = cursor.fetchall()
            is_valid = len(ans) == 1

            print("\n<br>region", ("is_valid" if is_valid else "not valid"))
            return is_valid
        return False

    def __validate_comuna(self, cursor):
        if type(self.comuna) is str:
            # check if that comuna is on the database
            cursor.execute(f"""
                SELECT * 
                FROM tarea2.region JOIN tarea2.comuna on region.id = comuna.region_id 
                WHERE region.nombre = '{self.region}'
                    AND comuna.nombre = '{self.comuna}';
            """)
            is_valid = len(cursor.fetchall()) == 1
            print("\n<br>comuna", ("is_valid" if is_valid else "not valid"))

            return is_valid
        return False

    def __validate_sector(self):
        is_valid = type(self.nombre) is str and len(self.nombre) <= 200
        print("\n<br>sector", ("is_valid" if is_valid else "not valid"))
        return is_valid

    def __validate_tipo(self):
        is_valid = (type(self.tipo) is str) \
                   and (self.tipo in ['no sé', 'insecto', 'arácnido', 'miriápodo'])
        print("\n<br>tipo", ("is_valid" if is_valid else "not valid"))
        return is_valid

    def __validate_estado(self):
        is_valid = type(self.estado) is str \
                   and (self.estado in ['no sé', 'vivo', 'muerto'])
        print("\n<br>estado", ("is_valid" if is_valid else "not valid"))
        return is_valid

    def __validate_fotos(self, cursor):
        # save the image (as file, not in the database)
        # check is a valid image file
        # if it is not, we have to remove it
        # if it is, we actually may have to remove it, depending on the other paramaters being valid or not
        # I should store the file direction on this class, in order to remove it after the whole validation is over
        # so, I should have a method which checks if we have our file,
        # which will be useful to remove it or adding it to de database
        for foto in self.fotos:
            # create the name with which it will be stored
            cursor.execute("""
                SELECT COUNT(id) FROM tarea2.foto
            """)
            hash_filename = str(cursor.fetchall()[0][0] + 1) + hashlib.sha256(foto.filename.encode()).hexdigest()[0:30]
            file_path = os.path.join("media", hash_filename)
            # save the foto on local
            open(file_path, 'wb+').write(foto.file.read())
            self.stored_foto_filenames.append(hash_filename)  # remember the stored filename
            if 'image/' not in filetype.guess(file_path).mime:
                print("<br>" + foto.filename + " is not valid")
                os.remove(file_path)  # remove from local
                self.stored_foto_filenames[-1] = None  # change the route to None,
                # so we can deduce which photos were invalid in case of need

        for stored_filename in self.stored_foto_filenames:
            if stored_filename is None:
                return False
        print("<br>fotos are valid!")
        return True

    def validate(self, cursor):
        is_valid = self.__validate_nombre() and self.__validate_email() and self.__validate_celular() \
                   and self.__validate_dia_hora() and self.__validate_region(cursor) and self.__validate_comuna(cursor)\
                   and self.__validate_sector() and self.__validate_tipo() and self.__validate_estado()\
                   and self.__validate_fotos(cursor)

        if not is_valid:
            # delete stored fotos
            for stored_filename in self.stored_foto_filenames:
                if stored_filename is not None:  # it was a valid and stored foto
                    os.remove(os.path.join("media", stored_filename))
        return is_valid

    def __str__(self):
        return "nombre: " + str(self.nombre) + \
               "\nemail: " + str(self.email) + \
               "\ncelular: " + str(self.celular) + \
               "\nfecha: " + str(self.dia_hora) + \
               "\nregion:" + str(self.region) + \
               "\ncomuna:" + str(self.comuna) + \
               "\nsector:" + str(self.sector) + \
               "\ntipo:" + str(self.tipo) + \
               "\nestado: " + str(self.estado) + \
               "\nfotos: " + str(self.fotos)


class AvistamientoDB:
    def __init__(self, host, user, password, database):
        self.db = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )
        self.database_name = database
        self.cursor = self.db.cursor()

    def __validate(self, data: AvistamientoData):
        return data.validate(self.cursor)

    def add_new_avistamiento(self, data: AvistamientoData):
        if self.__validate(data):
            print("<br>the whole avistamiento is valid!")
            self.cursor.execute(f"""
                SELECT region_id, comuna.id FROM tarea2.region 
                JOIN tarea2.comuna ON region.id = comuna.region_id
                WHERE region.nombre = '{data.region}' AND comuna.nombre = '{data.comuna}';
            """)
            region_id, comuna_id = self.cursor.fetchall()[0]
            dia_hora = datetime.strptime(data.dia_hora, '%Y-%m-%d %H:%M')

            # insert into avistamiento table
            self.cursor.execute("""
                INSERT INTO tarea2.avistamiento (comuna_id, dia_hora, sector, nombre, email, celular)
                VALUES (%s, %s, %s, %s, %s, %s);
            """, (comuna_id, dia_hora, data.sector, data.nombre, data.email, data.celular))
            self.db.commit()
            id_avistamiento = self.cursor.getlastrowid()

            # insert into detalle avistamiento table
            self.cursor.execute("""
                INSERT INTO tarea2.detalle_avistamiento (dia_hora, tipo, estado, avistamiento_id)
                VALUES (%s, %s, %s, %s);
            """, (dia_hora, data.tipo, data.estado, id_avistamiento))
            self.db.commit()
            id_detalle_avistamiento = self.cursor.getlastrowid()

            # insert into foto table
            for i in range(len(data.fotos)):
                foto = data.fotos[i]
                ruta = os.path.join("media", data.stored_foto_filenames[i])
                self.cursor.execute("""
                    INSERT INTO tarea2.foto (ruta_archivo, nombre_archivo, detalle_avistamiento_id)
                    VALUES (%s, %s, %s);
                """, (ruta, foto.filename, id_detalle_avistamiento))
                self.db.commit()
            pass
        else:
            print("<br>the avistamiento is not valid :c")
            return
        print("<br><br>")
