FROM python@sha256:6eaf19442c358afc24834a6b17a3728a45c129de7703d8583392a138ecbdb092
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/

# prereqs to instal psycopg2
RUN apt-get update && apt-get install -y libpq-dev gcc swig libssl-dev dpkg-dev netcat
# RUN pip3 install psycopg2
# RUN apt-get autoremove -y gcc

RUN pip install -r requirements.txt
COPY . /code/

# to actually run commands from within container, for deployment
# CMD [ "python", "./manage.py", "runserver", "0.0.0.0:80"]
CMD [ "uwsgi", "--ini", "uwsgi.ini"]