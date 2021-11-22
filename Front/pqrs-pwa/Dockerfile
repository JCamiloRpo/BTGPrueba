FROM node:14.17.0-alpine
# Servidor global
RUN npm install -g serve
# Set working directory
WORKDIR /home/node/app
# Copiar archivos
COPY . ./
# Instalar dependencias
RUN npm install
# Generar build
RUN npm run build
# Star app
CMD serve -s build