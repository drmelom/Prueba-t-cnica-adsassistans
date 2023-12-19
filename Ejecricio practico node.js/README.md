# Documentacion y uso
## Descriocion del codigo:
Esta es una apiRest desarrollada con el patron de diseño MVC, se define el endpoint /movie, donde desde el cual se pueden realiza operaciones CRUD
el uso de esta api esta descrito por lo siguientes servicios:

### Recuperar todas las películas
GET http://localhost:3000/movies



### Crear una película con POST
POST http://localhost:3000/movies
Content-Type: application/json

{
  "title": "The Godfather",
  "year": 1975,
  "director": "Francis Ford Coppola",
  "duration": 175,
  "poster": "https://img.fruugo.com/product/4/49/14441494_max.jpg",
  "genre": [
    "Crime",
    "Drama"
  ]
}

### Borrar una película
DELETE http://localhost:3000/movies/64d4d8825d614a4ec5984ae3

### Actualizar una película
PATCH http://localhost:3000/movies/64d4da882f83563ab4f40632
Content-Type: application/json

{
  "year": 2022
}

## Descripcion carpetas:
Al usar el patron de diseño MVC tenemos carpetas que obedecen a esta arquitectura, en la carpeta modelo encontramos la conexion a la base de datos de mongodb ademnas de ello implementamos las busquedas y logica necesaria para cada operacion, adicionalmente contamos con la carpeta, controllers, en esta carpeta se encuentra el archivo encargada de ejecutar los metodos de la clase modelo, el controlador se encarga de gestionar los los metodos y ejecucion de cada uno de las operaciones.
En la carpeta schemas hacemos uso de la libreria zod, para validar los datos de entrada, para la operacion de creacion, para conservar la estructura de datos de la base de datos.
En la carpeta routes definimos cada uno de las operaciones que tendra el endpoint movie




Para usar esta api de manera local se debe usar el comando pnpm install y posteriormente el comando npm start, el esquema de mongodb se encuentra en la nube