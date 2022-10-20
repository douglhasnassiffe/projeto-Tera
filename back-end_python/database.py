import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

connection = psycopg2.connect(host=os.environ["DB_HOST"],
                              dbname=os.environ["DB_NAME"],
                              user=os.environ["DB_USER"],
                              password=os.environ["DB_PASS"],)
cursor = connection.cursor()
