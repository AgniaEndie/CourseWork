import psycopg
import os


class DatabaseConnect:
    def get_pass(self):
        with open("/run/secrets/db-password") as f:
            return f.readline()

    def conn(self):
        return psycopg.connect(
            f"host=db port=5432 user=postgres dbname={os.environ.get('POSTGRES_DB')} password={self.get_pass()}")
