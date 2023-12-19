// Importación de la clase Router de Express para manejar las rutas
import { Router } from "express";
// Importación del controlador MovieController que gestionará las operaciones relacionadas con las películas
import { MovieController } from "../controllers/movie.js";

// Creación de un nuevo enrutador utilizando la clase Router de Express
export const movieRouter = Router();

// Definición de las rutas y sus correspondientes controladores

// Ruta para crear una nueva película (método HTTP: POST)
movieRouter.post("/", MovieController.create);

// Ruta para obtener todas las películas (método HTTP: GET)
movieRouter.get("/", MovieController.readAll);

// Ruta para actualizar una película existente por su ID (método HTTP: PATCH)
movieRouter.patch("/:id", MovieController.update);

// Ruta para eliminar una película por su ID (método HTTP: DELETE)
movieRouter.delete('/:id', MovieController.delete);