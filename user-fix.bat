docker stop $(docker ps -a -q) 2>nul
docker compose rm -f 2>nul
docker rm -vf $(docker ps -aq) 2>nul
docker rmi -f $(docker images -aq) 2>nul
echo Completed