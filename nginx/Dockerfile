# Використовуємо офіційний базовий образ Nginx
FROM nginx:latest

# Скопіюємо файли сертифікатів в контейнер
COPY ./ssl/nginx.crt /etc/nginx/ssl/nginx.crt
COPY ./ssl/nginx.key /etc/nginx/ssl/nginx.key

# Копіюємо конфігураційний файл Nginx
COPY ./nginx.conf /etc/nginx/nginx.conf

# Відкриваємо порти 80 та 443
EXPOSE 80:443

# Команда для запуску Nginx в foreground режимі
CMD ["nginx", "-g", "daemon off;"]
