# Встановіть npm залежності
#sudo rm -rf ./api/node_modules
#sudo rm -rf ./client/node_modules
#sudo rm -rf ./client-admin/node_modules

# Вимкніть контейнери та підніміть їх
#docker-compose down
#docker-compose up -d
#sleep 20s

# Зайти в контейнер api_backend і виконати команди knex
docker-compose exec api sh -c "npx knex migrate:latest && npx knex seed:run"

# Створіть директорію для SSL-сертифікатів
mkdir -p ./nginx/ssl
sudo chmod 777 ./nginx/ssl
openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout ./nginx/ssl/nginx.key -out ./nginx/ssl/nginx.crt -subj "/CN=calamutka.com" -addext "subjectAltName = DNS:api.calamutka.com, DNS:admin.calamutka.com"
# Очистіть старі записи, якщо вони існують
sudo sed -i '/calamutka.com\|api.calamutka.com\|admin.calamutka.com\|client_frontend\|api_backend\|client_frontend_admin/d' /etc/hosts

# Додайте нові записи
echo '127.0.0.1       calamutka.com api.calamutka.com admin.calamutka.com client_frontend api_backend client_frontend_admin' | sudo tee -a /etc/hosts

chmod 600 ./nginx/ssl/nginx.crt
chmod 600 ./nginx/ssl/nginx.key
