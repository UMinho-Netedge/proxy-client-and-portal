FROM python:alpine3.8

COPY requirements.txt /opt/app/requirements.txt

WORKDIR /opt/app
RUN pip install -r requirements.txt

COPY . /opt/app

RUN apk add iperf3

ENV PORT 5005

EXPOSE 5005

ENTRYPOINT [ "python3", "app.py" ]
