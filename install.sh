#!/usr/bin/env bash

# Перевірте, чи встановлено програмне забезпечення
#command -v npm >/dev/null 2>&1 || { echo >&2 "npm не знайдено. Встановіть npm та повторіть спробу."; exit 1; }
#command -v docker-compose >/dev/null 2>&1 || { echo >&2 "docker-compose не знайдено. Встановіть docker-compose та повторіть спробу."; exit 1; }

# Встановіть npm залежності
#sudo rm -rf ./node_modules && npm i

# Вимкніть контейнери та підніміть їх
#docker-compose down
#docker-compose up -d
#sleep 20s

# Створіть директорію для SSL-сертифікатів
mkdir -p ./nginx/ssl
sudo chmod 777 ./nginx/ssl

# Очистіть старі записи, якщо вони існують
sudo sed -i '/calamutka.com\|api.calamutka.com\|admin.calamutka.com\|client_frontend\|api_backend\|client_frontend_admin/d' /etc/hosts

# Додайте нові записи
echo '127.0.0.1       calamutka.com api.calamutka.com admin.calamutka.com client_frontend api_backend client_frontend_admin' | sudo tee -a /etc/hosts

openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout ./nginx/ssl/nginx.key -out ./nginx/ssl/nginx.crt -subj "/CN=calamutka.com" -addext "subjectAltName = DNS:api.calamutka.com, DNS:admin.calamutka.com"
chmod 600 ./nginx/ssl/nginx.crt
chmod 600 ./nginx/ssl/nginx.key


# Отримайте SSL-сертифікати від Let's Encrypt (тестовий режим)
#certbot certonly --manual --preferred-challenges=http --agree-tos --register-unsafely-without-email -d calamutka.com -d api.calamutka.com -d admin.calamutka.com -d client_frontend -d api_backend -d client_frontend_admin
