import psycopg2

def get_db_connection():
    return psycopg2.connect(
        dbname="postgres",
        user="fit5120",
        password="fit5120tp16",
        host="localhost",
        port="5432"
    )
