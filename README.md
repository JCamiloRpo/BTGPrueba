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
Se desarrolla una PWA (Progressive Web App) con React (utilizando Hooks y Redux) verificando el proceso con la extensión de Chrome Lighthouse, y realizando el despliegue de la pagina con un contenedor a Heroku quedando con el siguiente dominio: https://btg-pqr-prueba.herokuapp.com. Las siguientes imagenes son evidencia de que al ingresar a la pagina por medio de un celular aparece la opción de instalar:
  - ![image](https://user-images.githubusercontent.com/60258315/142912902-c3b6f3eb-2f50-4ce9-a354-592d321c96aa.png)
  - ![image](https://user-images.githubusercontent.com/60258315/142912949-c86940be-ac73-47a8-9f30-62c48271bb28.png)
  - ![image](https://user-images.githubusercontent.com/60258315/142913065-8210b0ef-89d8-4d93-bac5-5f4b5eedaec5.png)
Video de demostración:
  - https://user-images.githubusercontent.com/60258315/142914895-5ed4da2e-5ee5-425f-9910-992143b74628.mp4

Aunque cualquier persona puede descargar la app desde la página web, por se una PWA, también se integra Capacitor (de Ionic) para tener una aplicación hibrida con el mismo condigo fuente, cabe aclarar que por este camino igual tocaria ver el proyecto que nos genera Capacitor para cada plataforma (Android y IOS) para generar el APK/Bundle y así poder instalar la app. En este caso, para dispositivos android se genera el APK que se disponibiliza en la parte de [Releases](https://github.com/JCamiloRpo/BTGPrueba/releases/tag/APK) de GitHub. 
Evidencias:
  - ![image](https://user-images.githubusercontent.com/60258315/142918839-841a956b-33a1-419e-9e0b-912198d408f1.png)
  - https://user-images.githubusercontent.com/60258315/142918902-5fb764f2-d34e-46c7-a9b4-401a5de1f581.mp4

## Consideraciones
La aplicación tiene 3 clientes registrados en mongo, los cuales tienen sus propiar PQR también almacenadas en mongo, entonces sentido, en la ventana de inicio se puede elegir entre uno de los 3 clientes para visualizar y gestionar sus PQR. Además pone a disposición en el misma ventana de inicio la opción de ingresar como admin, siendo este capaz de visualizar todas las PQRs exitentes de todos los clientes y dar respuesta a cualquier de ellas, así se puede simular la comunicación bidireccional de las PQR y poder aplicar las reglas de negocio:
  - Solo reclamo a una petición o queja realizada hace mas de 5 días o que tenga una respuesta que no es de su agrado.
  - Toda PQR tiene un codigo unico.
  - Cada PQR puede ser consultada con su información y respuesta.
  - Cada Reclamo puede ser consultado con su información, respuesta y Petición o Queja.

Aunque el desarrollo de la plataforma no tenia como objetivo realizar una PWA y un desarrollo multiplataforma, se puede aprovechar para analizar ambos enfoques: con ambos desarrollos para aplicaciones hibridas se alcanza el mismo fin "disponibilidad en todos los sistemas", sin embargo personalmente se resulta mas factible y optimo el desarrollo de una PWA, debido a que no se necesitan generar los proyectos ni instaladores por separados, solo es el despliegue de la aplicación web con todas las configuraciones de una PWA para poder ser instalada en cualquier celular, mientras que utilizando algun framework como Ionic sería necesario personalizar los proyectos que genera (como se ve con el icono que puso en la apk).

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