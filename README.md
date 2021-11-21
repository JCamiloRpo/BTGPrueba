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


## Aplicación


## Referencias
- Diagramación hecha en [Visal Paradigm](https://online.visual-paradigm.com)