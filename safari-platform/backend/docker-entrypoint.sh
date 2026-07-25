#!/bin/sh
set -e

if [ "${WAIT_FOR_DB}" = "true" ]; then
  echo "Waiting for Postgres at ${DB_HOST:-db}:${DB_PORT:-5432}..."
  until python -c "
import os, sys, time
import psycopg2
host = os.environ.get('DB_HOST', 'db')
port = int(os.environ.get('DB_PORT', '5432'))
user = os.environ.get('POSTGRES_USER', 'postgres')
password = os.environ.get('POSTGRES_PASSWORD', 'postgres')
db = os.environ.get('POSTGRES_DB', 'safari_strives')
for _ in range(60):
    try:
        psycopg2.connect(host=host, port=port, user=user, password=password, dbname=db).close()
        sys.exit(0)
    except psycopg2.OperationalError:
        time.sleep(1)
sys.exit(1)
"; do
    echo "Postgres not ready yet..."
    sleep 2
  done
  echo "Postgres is ready."
fi

if [ "${RUN_MIGRATIONS}" = "true" ]; then
  echo "Running Alembic migrations..."
  alembic upgrade head
fi

exec "$@"
