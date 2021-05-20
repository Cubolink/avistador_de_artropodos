#!/usr/bin/python3
# -*- coding: utf-8 -*-


import cgi
import cgitb
from databases import AvistamientoDB, AvistamientoData

cgitb.enable()

print("Content-type:text/html\r\n\r\n")
utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)

form = cgi.FieldStorage()  # emtpy inputs are seem to be send anyway


# form = cgi.FieldStorage(keep_blank_values=1)  # empty inputs like sectors are send like empty strings


class AvistamientoAdapter:
    def __init__(self):
        self.db = AvistamientoDB(host='localhost', user='cc5002', password='programacionweb', database='tarea2')

    def add_form_data(self, nombre, email, celular,
                      fechas: list, regiones: list, comunas: list, sectores: list,
                      tipos_de_avistamiento: list, estados_de_avistamiento: list,
                      fotos_de_avistamiento_storages: list, contador_de_fotos_de_avistamiento: list):
        """
        Sends the data to the database.

        :param nombre: name of the submitter.
        :param email: email of the submitter.
        :param celular: phone of the submitter.
        :param fechas: list of avistamientos dates.
        :param regiones: list of avistamientos regions.
        :param comunas: list of avistamientos comunas.
        :param sectores: list of avistamientos sectors.
        :param tipos_de_avistamiento: list of avistamientos life being types.
        :param estados_de_avistamiento: list of avistamientos life being states.
        :param fotos_de_avistamiento_storages: list of avistamientos life being photos storages
            (all avistamientos in a single list).
        :param contador_de_fotos_de_avistamiento: list of avistamientos photos counters (to separate the photos).
        :return: None.
        """
        """
        print("nombre:", nombre, "<br>")
        print("email:", email, "<br>")
        print("celular:", celular, "<br>")
        print("<br><br>")

        print("fechas:", fechas, "<br>")
        print("regiones:", regiones, "<br>")
        print("comunas:", comunas, "<br>")
        print("sectores:", sectores, "<br>")
        print("tipos de avistamiento:", tipos_de_avistamiento, "<br>")
        print("estados de avistamiento:", estados_de_avistamiento, "<br>")
        print("fotos de avistamiento:", [foto.filename for foto in fotos_de_avistamiento_storages], "<br>")
        print("contador de fotos:", contador_de_fotos_de_avistamiento, "<br><br>")"""

        # separamos en avistamientos
        avistamientos = []
        assert len(fechas) == len(regiones) == len(comunas) == len(sectores) == len(tipos_de_avistamiento) == \
               len(estados_de_avistamiento) == len(contador_de_fotos_de_avistamiento)
        numero_de_avistamientos = len(fechas)

        first_avistamiento_foto_index = 0
        for i in range(numero_de_avistamientos):
            last_avistamiento_foto_index = first_avistamiento_foto_index + contador_de_fotos_de_avistamiento[i]
            avistamiento = AvistamientoData(nombre=nombre, email=email, celular=celular,
                                            dia_hora=fechas[i], region=regiones[i], comuna=comunas[i],
                                            sector=sectores[i],
                                            tipo=tipos_de_avistamiento[i], estado=estados_de_avistamiento[i],
                                            fotos=fotos_de_avistamiento_storages[first_avistamiento_foto_index:
                                                                                 last_avistamiento_foto_index])

            if avistamiento.fotos[-1].filename == '':
                avistamiento.fotos = avistamiento.fotos[0:-1]  # the last element is empty because it wasn't sent
            avistamientos.append(avistamiento)
            first_avistamiento_foto_index = last_avistamiento_foto_index

            print(avistamiento)
            print("<br><br>")
        # print(avistamientos)

        for i in range(len(avistamientos)):
            self.db.add_new_avistamiento(avistamientos[i])


print(form.keys())
print("<br><br>")

db = AvistamientoAdapter()
db.add_form_data(
    nombre=form['nombre'].value,
    email=form['email'].value,
    celular=form['celular'].value,

    fechas=[fecha.value for fecha in form['dia-hora-avistamiento']]
    if (type(form['dia-hora-avistamiento']) is list) else [form['dia-hora-avistamiento'].value],

    regiones=[region.value for region in form['region']] if (type(form['region']) is list) else [form['region'].value],

    comunas=[comuna.value for comuna in form['comuna']] if (type(form['comuna']) is list) else [form['comuna'].value],

    sectores=[sector.value for sector in form['sector']] if (type(form['sector']) is list) else [form['sector'].value],

    tipos_de_avistamiento=[tipo.value for tipo in form['tipo-avistamiento']]
    if (type(form['tipo-avistamiento']) is list) else [form['tipo-avistamiento'].value],

    estados_de_avistamiento=[estado.value for estado in form['estado-avistamiento']]
    if (type(form['estado-avistamiento']) is list) else [form['estado-avistamiento'].value],

    fotos_de_avistamiento_storages=form['foto-avistamiento'],

    contador_de_fotos_de_avistamiento=[int(contador_foto.value) for contador_foto in form['hidden-photo-counter']]
    if (type(form['hidden-photo-counter']) is list) else [int(form['hidden-photo-counter'].value)]
)

"""
print(form)
print("<br><br><br>")
print("nombre:", form['nombre'], "<br>")
print("email:", form['email'], "<br>")
print("celular:", form['celular'], "<br>")
print("<br><br>")

print("fechas:", form['dia-hora-avistamiento'], "<br>")
print("regiones:", form['region'], "<br>")
print("comunas:", form['comuna'], "<br>")
print("sectores:", form['sector'], "<br>")
print("tipos de avistamiento:", form['tipo-avistamiento'], "<br>")
print("estados de avistamiento:", form['estado-avistamiento'], "<br>")
print("fotos de avistamiento:", form['foto-avistamiento'], "<br>")
print("contador de fotos:", form['hidden-photo-counter'])
"""
