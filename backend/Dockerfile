FROM python:3.13-alpine

WORKDIR /app

COPY . .

RUN apk add --no-cache gcc python3-dev musl-dev linux-headers
RUN pip install -r requirements.txt

CMD ["sh", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py collectstatic --noinput && gunicorn --bind 0.0.0.0:8000 config.wsgi:application"]