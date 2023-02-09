#! /bin/bash

cd ..
docker login
docker build -f ./docker/Dockerfile -t uminhonetedge/proxy_client:latest .
docker push uminhonetedge/proxy_client:latest
cd docker
docker-compose up 