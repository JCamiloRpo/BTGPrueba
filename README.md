# BTGPrueba
Repo para guardar el desarrollo del software
## Diagrama DB
![image](https://user-images.githubusercontent.com/60258315/142739808-31043820-b47f-46f4-9dd0-171c57c03d7d.png)
- MongoDB
  Se puede detallar el documento que quedaria para cada cliente en el archivo [mongo.model.json](models/mongo.model.json)

- DynamoDB
  En el caso de dynamo se crea el modelo como se muestra en el archivo [dynamo.model.json](models/dynamo.model.json), donde:
    - idClient: compuesto por un identificador unico y con el nombre del client
    - idRequest: compuesto por el numero de radicado y la fecha de creación
    - Además cada registro en la tabla tendra los demás atributos espeificados en el diagrama

## Referencias
- Diagramación hecha en [Visal Paradigm](https://online.visual-paradigm.com)