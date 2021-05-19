#!/usr/bin/python3
# -*- coding: utf-8 -*-
import hashlib
import os
import mysql.connector
import filetype


class Avistamiento:
    def __init__(self, host, user, password, database):
        self.db = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )
        self.database_name = database
        self.cursor = self.db.cursor()

    @staticmethod
    def __validate(data):
        if len(data) > 0:
            return True
        return False

    def add_new_single_avistamiento(self, data):
        # self.cursor.execute("""
        #     INSERT INTO tarea2.avistamiento()
        # """, (self.database_name, data))
        pass

    def add_multiple_new_avistamientos(self, data):
        self.add_new_single_avistamiento(data)
