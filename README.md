# BTGPrueba
Repo para guardar el desarrollo del software

## Metodologia ágil
Se utiliza un tablero canva en [Trello](https://trello.com/b/ChoSnOUj), para realizar un mapeo a gran escala de las tareas a realizar para el desarrollo

## Diagrama DB
![image](https://user-images.githubusercontent.com/60258315/142771388-7c62a577-4603-4361-a482-7a1bede047bd.png)
- MongoDB
  Se puede detallar el documento de PQR que quedaria para los cliente en el archivo [mongo.model.json](models/mongo.model.json)

- DynamoDB
  En el caso de dynamo se crea el modelo como se muestra en el archivo [dynamo.model.json](models/dynamo.model.json), donde:
    - idClient: compuesto por un identificador unico y con el nombre del client
    - idRequest: compuesto por el numero de radicado y la fecha de creación
    - Además cada registro en la tabla tendra los demás atributos espeificados en el diagrama

## Servidor API Rest
El servidor API REST se desarrolla en node con express, donde se implementan controladores, rutas con sus validaciones y un middleware que sirve para validar un token de acceso a la aplicación.

Se despliega con un contenedor a Heroku bajo con el dominio https://btg-pqr-prueba-api.herokuapp.com y se puede revisar el estado del servidor en la ruta [/api/health-check](https://btg-pqr-prueba-api.herokuapp.com/api/health-check)

## Aplicación
Se encamina el desarrollo a una PWA (Progressive Web App) con React (utilizando Hooks y Redux) verificando el proceso con la extensión de Chrome Lighthouse.

El despliegue se realiza tambien con un contenedor a Heroku quedando con el siguiente dominio: https://btg-pqr-prueba.herokuapp.com 

## Referencias
- Diagramación hecha en [Visal Paradigm](https://online.visual-paradigm.com)
- Despliegue hecho en [Heroku](https://www.heroku.com)
- Tecnologias:
  - [MongoDB](https://www.mongodb.com)
  - [Express](https://expressjs.com)
  - [JsonSchema](https://json-schema.org)
  - [JWT](https://jwt.io)
  - [React](https://es.reactjs.org)
  - [React + PWA](https://pwaexperts.io/tutoriales/desarrolla-primera-pwa-react)
  - [Capacitor](https://capacitorjs.com/solution/react)
- Recursos gráficos:
  - [Canva](https://www.canva.com)
  - [Photopea](https://www.photopea.com)
  - [MUI](https://mui.com)
  - [Maskable Icon](https://maskable.app/editor)