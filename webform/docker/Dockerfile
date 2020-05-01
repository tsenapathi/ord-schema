FROM python:3-slim
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/

# prereqs to instal psycopg2
RUN apt-get update && apt-get install -y libpq-dev gcc
RUN pip3 install psycopg2
# RUN apt-get autoremove -y gcc

RUN pip install -r requirements.txt
COPY . /code/
