FROM python:3.13-alpine

WORKDIR /app

COPY . /app
COPY requirements.txt .

RUN apk add --no-cache gcc python3-dev musl-dev linux-headers
RUN pip install -r requirements.txt

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]