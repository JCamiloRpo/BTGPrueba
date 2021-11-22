FROM node:14.17.0-alpine
# Servidor global
RUN npm install -g serve
# Set working directory
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
# Copiar archivos
COPY . ./
# Instalar dependencias
USER node
RUN npm install
# Generar build
RUN npm run build
# Star app
CMD serve -s build