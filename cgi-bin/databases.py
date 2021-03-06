#!/usr/bin/python3
# -*- coding: utf-8 -*-
import hashlib
import os
from datetime import datetime
from PIL import Image
import re

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
        self.validation_error_messages = []

    def __add_error_msg(self, msg):
        self.validation_error_messages.append(msg)

    def __validate_nombre(self):
        is_valid = type(self.nombre) is str and 0 < len(self.nombre) <= 100
        if not is_valid:
            self.__add_error_msg("El nombre recibido no es válido")
        # print("\n<br>nombre", ("is_valid" if is_valid else "not valid"))
        return is_valid

    def __validate_email(self):
        is_valid = type(self.email) is str and 0 < len(self.email) <= 100 and\
                   (re.match(r'^[^\s@]+@[^\s@]+$', self.email) is not None)
        if not is_valid:
            self.__add_error_msg("El correo recibido no es válido")
        # print("\n<br>email", ("is_valid" if is_valid else "not valid"))
        return is_valid

    def __validate_celular(self):
        if type(self.celular) is str:
            self.celular = self.celular.replace(" ", "")  # remove spaces

            is_valid = self.celular == "" or (re.match(r'^\+569\d{8}$', self.celular) is not None)
            if not is_valid:
                self.__add_error_msg("El celular recibido no es válido")
            return is_valid
        # print("\n<br>celular", ("is_valid" if is_valid else "not valid"))
        return False

    def __validate_dia_hora(self):
        try:
            if type(self.dia_hora) is str:
                datetime.strptime(self.dia_hora, '%Y-%m-%d %H:%M')
                return True
            self.__add_error_msg("La fecha recibida no es válida")
            return False
        except ValueError:
            self.__add_error_msg("La fecha recibida no es válida")
            return False

    def __validate_region(self, cursor):
        if type(self.region) is str:
            # check if that region is on the database
            cursor.execute(f"""
                SELECT nombre FROM region WHERE nombre='{self.region}';
            """)
            ans = cursor.fetchall()
            is_valid = len(ans) == 1
            if not is_valid:
                self.__add_error_msg("La región recibida no es válida")
            # print("\n<br>region", ("is_valid" if is_valid else "not valid"))
            return is_valid
        return False

    def __validate_comuna(self, cursor):
        if type(self.comuna) is str:
            # check if that comuna is on the database
            cursor.execute(f"""
                SELECT * 
                FROM region JOIN comuna on region.id = region_id 
                WHERE region.nombre = '{self.region}'
                    AND comuna.nombre = '{self.comuna}';
            """)
            is_valid = len(cursor.fetchall()) == 1
            # print("\n<br>comuna", ("is_valid" if is_valid else "not valid"))
            if not is_valid:
                self.__add_error_msg("La comuna recibida no es válida")

            return is_valid
        return False

    def __validate_sector(self):
        is_valid = type(self.nombre) is str and len(self.nombre) <= 200
        # print("\n<br>sector", ("is_valid" if is_valid else "not valid"))
        if not is_valid:
            self.__add_error_msg("El sector recibido no es válido")
        return is_valid

    def __validate_tipo(self, cursor):
        cursor.execute("""
                SELECT COLUMN_TYPE
                FROM INFORMATION_SCHEMA.COLUMNS
                WHERE TABLE_SCHEMA = 'cc500232_db'
                    AND TABLE_NAME = 'detalle_avistamiento'
                    AND COLUMN_NAME = 'tipo'
                """)
        tipos = cursor.fetchall()[0]

        is_valid = (type(self.tipo) is str) and (self.tipo in ['no sé', 'insecto', 'arácnido', 'miriápodo'])
        if not is_valid:
            self.__add_error_msg("El tipo recibido no es válido")
        # print("\n<br>tipo", ("is_valid" if is_valid else "not valid"))
        return is_valid

    def __validate_estado(self, cursor):
        cursor.execute("""
                        SELECT COLUMN_TYPE
                        FROM INFORMATION_SCHEMA.COLUMNS
                        WHERE TABLE_SCHEMA = 'cc500232_db'
                            AND TABLE_NAME = 'detalle_avistamiento'
                            AND COLUMN_NAME = 'tipo'
                        """)
        estados = cursor.fetchall()[0]

        is_valid = type(self.estado) is str and (self.estado in ['no sé', 'vivo', 'muerto'])
        # print("\n<br>estado", ("is_valid" if is_valid else "not valid"))
        if not is_valid:
            self.__add_error_msg("El estado recibido no es válido")
        return is_valid

    def __validate_fotos(self, cursor):
        for foto in self.fotos:
            # create the name with which it will be stored
            cursor.execute("""
                SELECT COUNT(id) FROM foto
            """)
            hash_filename = str(cursor.fetchall()[0][0] + 1) + hashlib.sha256(foto.filename.encode()).hexdigest()[0:30]
            file_path = os.path.join("..", "media", hash_filename)
            # save the foto on local
            try:
                if not os.path.exists(os.path.join("..", "media")):
                    os.makedirs(os.path.join("..", "media"))
                open(file_path, 'wb+').write(foto.file.read())
            except FileNotFoundError:
                print("current:", os.getcwd())
                print("attempting:", file_path)
            self.stored_foto_filenames.append(hash_filename)  # remember the stored filename
            if 'image/' not in filetype.guess(file_path).mime:
                # print("<br>" + foto.filename + " is not valid")
                os.remove(file_path)  # remove from local
                self.stored_foto_filenames[-1] = None  # change the route to None,
                # so we can deduce which photos were invalid in case of need

        for stored_filename in self.stored_foto_filenames:
            if stored_filename is None:
                self.__add_error_msg("Al menos una de las fotos recibidas no es válida")
                return False
        # print("<br>fotos are valid!")
        return True

    def validate(self, cursor):
        self.validation_error_messages = []
        # we have to validate all, to write all the messages even when one invalid means the whole thing is invalid
        is_valid_name = self.__validate_nombre()
        is_valid_email = self.__validate_email()
        is_valid_phone = self.__validate_celular()
        is_valid_fecha = self.__validate_dia_hora()
        is_valid_region = self.__validate_region(cursor)
        is_valid_comuna = self.__validate_comuna(cursor)
        is_valid_sector = self.__validate_sector()
        is_valid_tipo = self.__validate_tipo(cursor)
        is_valid_estado = self.__validate_estado(cursor)
        is_valid_foto = self.__validate_fotos(cursor)

        # and then we can do an 'and'
        is_valid = is_valid_name and is_valid_email and is_valid_phone and is_valid_fecha and is_valid_region and \
                   is_valid_comuna and is_valid_sector and is_valid_tipo and is_valid_estado and is_valid_foto

        if not is_valid:
            # delete stored fotos
            for stored_filename in self.stored_foto_filenames:
                if stored_filename is not None:  # it was a valid and stored foto
                    os.remove(os.path.join("..", "media", stored_filename))
            self.stored_foto_filenames = []
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
        """
        Validates and adds an avistamiento to the database.
        :param data: The data to add to the database.
        :return: True if the data was inserted into the database. False if it wasn't valid.
        """
        if self.__validate(data):
            # print("<br>the whole avistamiento is valid!")
            self.cursor.execute(f"""
                SELECT region_id, comuna.id FROM region 
                JOIN comuna ON region.id = comuna.region_id
                WHERE region.nombre = '{data.region}' AND comuna.nombre = '{data.comuna}';
            """)
            region_id, comuna_id = self.cursor.fetchall()[0]
            dia_hora = datetime.strptime(data.dia_hora, '%Y-%m-%d %H:%M')

            # insert into avistamiento table
            self.cursor.execute("""
                INSERT INTO avistamiento (comuna_id, dia_hora, sector, nombre, email, celular)
                VALUES (%s, %s, %s, %s, %s, %s);
            """, (comuna_id, dia_hora, data.sector, data.nombre, data.email, data.celular))
            self.db.commit()
            id_avistamiento = self.cursor.getlastrowid()

            """tipo_parser = {
                "no sé": "no sÃ©",
                "insecto": "insecto",
                "arácnido": "arÃ¡cnido",
                "miriápodo": "miriÃ¡podo"
            }
            estado_parser = {
                "no sé": "no sÃ©",
                "vivo": "vivo",
                "muerto": "muerto"
            }"""
            # insert into detalle avistamiento table
            self.cursor.execute("""
                INSERT INTO detalle_avistamiento (dia_hora, tipo, estado, avistamiento_id)
                VALUES (%s, %s, %s, %s);
            """, (dia_hora, data.tipo, data.estado, id_avistamiento))
            self.db.commit()
            id_detalle_avistamiento = self.cursor.getlastrowid()

            # insert into foto table
            for i in range(len(data.fotos)):
                foto = data.fotos[i]
                ruta = os.path.join("..", "media", data.stored_foto_filenames[i])
                self.cursor.execute("""
                    INSERT INTO foto (ruta_archivo, nombre_archivo, detalle_avistamiento_id)
                    VALUES (%s, %s, %s);
                """, (ruta, foto.filename, id_detalle_avistamiento))
                self.db.commit()
                # create, also, two files: ruta_archivo+"big", ruta_archivo+"small"
                stored_img = Image.open(ruta)
                stored_img.resize((800, 600), Image.BICUBIC).save(ruta + "-big", format=stored_img.format)
                stored_img.resize((320, 240), Image.BICUBIC).save(ruta + "-small", format=stored_img.format)
                stored_img.close()

            return True
        else:
            return False
        # print("<br><br>")

    def get_last_avistamientos_preview(self, n):
        """
        Gets the last n avistamientos from database

        :param n: The number of avistamientos to retrieve
        :return: A list with the last n avistamientos.
        """
        self.cursor.execute(f"""
            SELECT detalle_avistamiento.dia_hora, comuna.nombre, avistamiento.sector, detalle_avistamiento.tipo, 
                foto.ruta_archivo, foto.nombre_archivo
            FROM detalle_avistamiento 
                JOIN avistamiento ON avistamiento.id = detalle_avistamiento.avistamiento_id
                JOIN comuna ON comuna.id = avistamiento.comuna_id
                JOIN foto ON foto.detalle_avistamiento_id = detalle_avistamiento.id
                ORDER BY detalle_avistamiento.dia_hora DESC
            LIMIT {n};
        """)
        ans = self.cursor.fetchall()  # [(fecha, comuna, sector, tipo, ruta), ...]
        res = []
        for t in ans:
            res.append({
                "fecha": t[0],
                "comuna": t[1],
                "sector": t[2],
                "tipo": t[3],
                "ruta": t[4],
                "filename": t[5]
            })
        return res

    def get_avistamientos_listado(self, offset=0, n=5):
        """
        Gets a list of n date-ordered avistamientos from starting from the offset index.
        :param offset: Offset from where to start the list.
        :param n: Number of elements in the list.
        :return: List of dictionaries with 'avistamiento_id', 'fecha', 'comuna', 'sector', 'nombre', 'n_fotos',
        'n_detalles'
        """
        self.cursor.execute(f"""
            SELECT avistamiento.id, avistamiento.dia_hora,
                    comuna.nombre AS comuna, avistamiento.sector, avistamiento.nombre, 
                    det_avist.total_number_of_fotos, det_avist.total_details_per_avistamiento
            FROM avistamiento
                JOIN (
                    SELECT detalle_avistamiento.avistamiento_id,
                            SUM(det_avist_total_fotos.number_of_fotos) AS total_number_of_fotos, 
                            COUNT(detalle_avistamiento.id) AS total_details_per_avistamiento
                    FROM detalle_avistamiento
                        JOIN (
                            SELECT detalle_avistamiento.id AS da_id, COUNT(*) AS number_of_fotos
                            FROM detalle_avistamiento
                                JOIN foto ON detalle_avistamiento.id = foto.detalle_avistamiento_id
                            GROUP BY detalle_avistamiento.id
                        ) AS det_avist_total_fotos ON detalle_avistamiento.id = det_avist_total_fotos.da_id
                    GROUP BY detalle_avistamiento.avistamiento_id
                ) AS det_avist ON avistamiento.id = det_avist.avistamiento_id
                JOIN comuna on avistamiento.comuna_id = comuna.id
            ORDER BY avistamiento.dia_hora DESC
            LIMIT {offset}, {n}
        """)
        ans = self.cursor.fetchall()
        res = []
        for t in ans:
            res.append({
                "avistamiento_id": t[0],
                "fecha": t[1],
                "comuna": t[2],
                "sector": t[3],
                "nombre": t[4],
                "n_fotos": t[5],
                "n_detalles": t[6]
            })
        # [(fecha, comuna, sector, nombre, total de fotos, total de detalles para el avistamiento),
        # ...]
        return res

    def get_avistamiento_detalles(self, avistamiento_id):
        """
        Gets the detalles of an avistamiento.
        :param avistamiento_id: Id of the avistamiento to retrieve its details.
        :return: Dictionary with 'fecha', 'region', 'comuna', 'sector', 'tipo', 'estado', 'nombre', 'email', 'celular',
        and 'rutas' and 'filenames', which are list of the rutas and filenames of the photos of the avistamiento.
        """
        results = self.cursor.execute(f"""
            SELECT avistamiento.dia_hora, region.nombre, comuna.nombre, avistamiento.sector,
                detalle_avistamiento.tipo, detalle_avistamiento.estado, # fotos in another query
                avistamiento.nombre, avistamiento.email, avistamiento.celular
            FROM avistamiento
                JOIN comuna ON avistamiento.comuna_id = comuna.id
                JOIN region ON comuna.region_id = region.id
                JOIN detalle_avistamiento ON avistamiento.id = detalle_avistamiento.avistamiento_id
            WHERE avistamiento.id = {avistamiento_id}
        """)  # Get all the information about the avistamiento but the list of photos
        # [(fecha, region, comuna, sector, tipo, estado, nombre, email, celular)]
        info = self.cursor.fetchall()
        if len(info) == 0:  # there's no such index
            return
        info = info[0]

        self.cursor.execute(f"""
            SELECT foto.ruta_archivo, foto.nombre_archivo
            FROM avistamiento
                JOIN detalle_avistamiento ON avistamiento.id = detalle_avistamiento.avistamiento_id
                JOIN foto ON detalle_avistamiento.id = foto.detalle_avistamiento_id
            WHERE avistamiento.id = {avistamiento_id}  # Get the list of photos
        """)  # Get the list of photos for that avistamiento
        # [(ruta, original filename), ...]
        fotos = self.cursor.fetchall()

        return {
            "fecha": info[0],
            "region": info[1],
            "comuna": info[2],
            "sector": info[3],
            "tipo": info[4],
            "estado": info[5],
            "nombre": info[6],
            "email": info[7],
            "celular": info[8],
            "rutas": [foto_tuple[0] for foto_tuple in fotos],
            "filenames": [foto_tuple[1] for foto_tuple in fotos]
        }

    @staticmethod
    def __fill_missing_timeseries_by_estado_data(last_date, time_series_by_estado, estados_on_last_date):
        """
        Fills with 0-data those estado of avistamiento that doesn't appear in the data on that last_date, when
        the current date is other day.
        :param last_date: The last date with information.
        :param time_series_by_estado: The time series where to add the missing info.
        :param estados_on_last_date: The estados that are part of data on that date.
        """
        if 'vivo' not in estados_on_last_date:
            time_series_by_estado.append({
                "fecha": last_date,
                "estado": 'vivo',
                "n_avistamientos": 0
            })
        if 'muerto' not in estados_on_last_date:
            time_series_by_estado.append({
                "fecha": last_date,
                "estado": 'muerto',
                "n_avistamientos": 0
            })
        if 'no sé' not in estados_on_last_date:
            time_series_by_estado.append({
                "fecha": last_date,
                "estado": 'no sé',
                "n_avistamientos": 0
            })

    def get_avistamiento_time_series(self):
        """
        Gets three different kind of queries for the avistamientos:
        * Time series: A list of dictionaries with 'fecha' and 'n_avistamientos'
        * Count tipo: A list of dictionaries with 'tipo' de avistamiento and 'n_avistamientos'
        * Time series by estado: A list of dictionaries with 'fecha', 'estado' and 'n_avistamientos'
        :return: time_series, count_tipo, time_series_by_estado
        """
        # time series
        self.cursor.execute("""
            SELECT DATE_FORMAT(dia_hora,'%Y-%m-%d') AS fecha, count(*) AS n_avistamientos 
                FROM detalle_avistamiento
              GROUP BY fecha
        """)
        raw_time_series = self.cursor.fetchall()
        # parse
        time_series = []
        for t in raw_time_series:
            time_series.append({
                "fecha": t[0],
                "n_avistamientos": t[1]
            })

        self.cursor.execute("""
            SELECT tipo, count(*) AS n_avistamientos 
                FROM `detalle_avistamiento`
              GROUP BY tipo
        """)
        raw_count_by_estado = self.cursor.fetchall()
        # parse
        count_tipo = []
        for t in raw_count_by_estado:
            count_tipo.append({
                "tipo": t[0],
                "n_avistamientos": t[1]
            })

        self.cursor.execute("""
            SELECT DATE_FORMAT(dia_hora,'%Y-%m') AS fecha, estado, count(*) AS n_avistamientos
                FROM detalle_avistamiento
              WHERE estado = 'vivo'
              GROUP BY EXTRACT(YEAR_MONTH FROM dia_hora)
            UNION
            SELECT DATE_FORMAT(dia_hora,'%Y-%m') AS fecha, estado, count(*) AS n_avistamientos
                FROM detalle_avistamiento
              WHERE estado = 'muerto'
              GROUP BY EXTRACT(YEAR_MONTH FROM dia_hora)
            UNION
            SELECT DATE_FORMAT(dia_hora,'%Y-%m') AS fecha, estado, count(*) AS n_avistamientos
                FROM detalle_avistamiento
              WHERE estado = 'no sé'
              GROUP BY EXTRACT(YEAR_MONTH FROM dia_hora)
            ORDER BY fecha
        """)  #
        raw_time_series_by_estado = self.cursor.fetchall()
        # parse
        time_series_by_estado = []
        last_date = ""
        estados_on_last_date = ['vivo', 'muerto', 'no sé']
        for t in raw_time_series_by_estado:
            if t[0] != last_date:
                # if the last date doesn't have all estados, we create that data with zeros
                self.__fill_missing_timeseries_by_estado_data(last_date, time_series_by_estado, estados_on_last_date)

                # update the last date, and reset the estados on last date
                last_date = t[0]
                estados_on_last_date = []

            # append the new data
            time_series_by_estado.append({
                "fecha": t[0],
                "estado": t[1],
                "n_avistamientos": t[2]
            })
            if t[1] not in estados_on_last_date:  # update the estados on this last date
                estados_on_last_date.append(t[1])

        self.__fill_missing_timeseries_by_estado_data(last_date, time_series_by_estado, estados_on_last_date)

        # return parsed data
        return time_series, count_tipo, time_series_by_estado

    def get_n_avistamientos_per_comuna(self):
        """
        Gets the number of avistamientos per each comuna.
        :return: A list of dictionaries with 'comuna' (name), 'comuna_id' and 'n_avistamientos'
        """
        self.cursor.execute("""
            SELECT comuna.nombre, comuna.id, count(*)
                FROM avistamiento 
                    JOIN comuna ON avistamiento.comuna_id = comuna.id
                    JOIN detalle_avistamiento on avistamiento.id = detalle_avistamiento.avistamiento_id
                GROUP BY comuna_id;
        """)
        raw_n_avistamientos_per_comuna = self.cursor.fetchall()

        n_avistamientos_per_comuna = []
        for i in range(len(raw_n_avistamientos_per_comuna)):
            n_avistamientos_per_comuna.append({
                "comuna": raw_n_avistamientos_per_comuna[i][0],
                "comuna_id": raw_n_avistamientos_per_comuna[i][1],
                "n_avistamientos": raw_n_avistamientos_per_comuna[i][2]
            })
        return n_avistamientos_per_comuna

    def get_avistamientos_listado_on_comuna(self, comuna_id):
        """
        Gets the listado of avistamientos on a comuna.
        :param comuna_id: The id of the comuna where retrieve the avistamientos from
        :return: A list of dictionaries with 'fecha', 'tipo', 'estado', 'avistamiento_id',
        and 'rutas', 'filenames' with list of the rutas and filenames of the photos of the avistamientos.
        """
        self.cursor.execute(f"""
            SELECT DATE_FORMAT(detalle_avistamiento.dia_hora,'%Y-%m-%d'),
            detalle_avistamiento.tipo, detalle_avistamiento.estado, avistamiento_id
                FROM avistamiento 
                    JOIN detalle_avistamiento ON avistamiento.id = detalle_avistamiento.avistamiento_id
                WHERE avistamiento.comuna_id = {comuna_id}
        """)
        raw_data = self.cursor.fetchall()
        listado = []
        for d in raw_data:
            self.cursor.execute(f"""
                SELECT foto.ruta_archivo, foto.nombre_archivo
                FROM avistamiento
                    JOIN detalle_avistamiento ON avistamiento.id = detalle_avistamiento.avistamiento_id
                    JOIN foto ON detalle_avistamiento.id = foto.detalle_avistamiento_id
                WHERE avistamiento_id = {d[3]}
            """)
            fotos_y_rutas = self.cursor.fetchall()

            listado.append({
                "fecha": d[0],
                "tipo": d[1],
                "estado": d[2],
                "avistamiento_id": d[3],
                "rutas": [foto_ruta[0] for foto_ruta in fotos_y_rutas],
                "filenames": [foto_ruta[1] for foto_ruta in fotos_y_rutas]
            })

        return listado
