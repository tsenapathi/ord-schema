FROM informaticsmatters/rdkit-python3-debian
USER root
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/

# Prereqs to install psycopg2
RUN apt-get update && apt-get install -y libpq-dev gcc swig libssl-dev dpkg-dev netcat

RUN pip install -r requirements.txt
COPY . /code/

CMD [ "uwsgi", "--ini", "uwsgi.ini"]