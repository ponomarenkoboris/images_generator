FROM python:3.10
ENV PYTHONUNBUFFERED 1

WORKDIR /server
COPY requirements.txt /server/
RUN pip install -r requirements.txt

COPY . .

RUN python manage.py makemigrations \
    && python manage.py migrate

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]