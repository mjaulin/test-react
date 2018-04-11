FROM nginx:stable-alpine
COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY dist /usr/share/nginx/html