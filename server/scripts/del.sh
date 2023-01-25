cd .. 
cd docker 
docker compose down 
docker volume rm $(docker volume ls -q)
docker image rm uminhonetedge/proxy_client:
