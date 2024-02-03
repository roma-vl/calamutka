#!/usr/bin/env bash

# Install npm dependencies
#sudo rm -rf ./node_modules && npm i
#
#docker-compose down
#docker-compose up -d
#sleep 20s

mkdir -p  ./nginx/ssl
sudo chmod 777  ./nginx/ssl


openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout ./nginx/ssl/nginx.key -out ./nginx/ssl/nginx.crt
#openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout ./build/development/conf/nginx/ssl/localhost.key -out ./build/development/conf/nginx/ssl/localhost.crt


# Add containers to /etc/hosts
#if ! [[ $(cat /etc/hosts | grep api_backend) ]]; then
#    sudo -- sh -c -e "echo '127.0.0.1       calamutka.com' >> /etc/hosts";
#    sudo -- sh -c -e "echo '127.0.0.1       api.calamutka.com' >> /etc/hosts";
#    sudo -- sh -c -e "echo '127.0.0.1       admin.calamutka.com' >> /etc/hosts";
#    sudo -- sh -c -e "echo '127.0.0.1       client_frontend' >> /etc/hosts";
#    sudo -- sh -c -e "echo '127.0.0.1       api_backend' >> /etc/hosts";
#    sudo -- sh -c -e "echo '127.0.0.1       client_frontend_admin' >> /etc/hosts";
#fi
