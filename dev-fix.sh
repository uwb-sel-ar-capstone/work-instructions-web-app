
sudo chown -R $USER:$USER ./work-instructions-backend/node_modules || true
sudo chown -R $USER:$USER ./work-instructions-frontend/node_modules || true
docker stop $(docker ps -a -q) 2>/dev/null || true
docker compose rm -f 2>/dev/null || true
docker rm -vf $(docker ps -aq) 2>/dev/null || true
docker rmi -f $(docker images -aq) 2>/dev/null || true

cd work-instructions-frontend/; npm install
cd ..
cd work-instructions-backend/; npm install
cd ..

echo Completed
