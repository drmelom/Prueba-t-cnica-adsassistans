// Importación de la clase MovieModel para realizar operaciones en la base de datos MongoDB
import { MovieModel } from "../models/mongodb/movie.js";
// Importación de funciones de validación de esquemas para las películas
import { validateMovie, validatePartialMovie } from "../schemas/movie.js";

// Definición de la clase MovieController para gestionar las operaciones relacionadas con las películas
export class MovieController {
  // Método estático para obtener todas las películas desde la base de datos y enviarlas como respuesta JSON
  static async readAll(_, res) {
    const movies = await MovieModel.readAll();
    res.json(movies);
  }

  // Método estático para crear una nueva película en la base de datos
  static async create(req, res) {
    // Validación del cuerpo de la solicitud utilizando el esquema completo de película
    const result = validateMovie(req.body);

    // Verificación de éxito en la validación
    if (!result.success) {
      // En caso de fallo, devolver un error 400 con detalles de validación
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    // Creación de una nueva película en la base de datos utilizando el modelo MovieModel
    const newMovie = await MovieModel.create({ input: result.data });

    // Envío de la nueva película como respuesta con un código de estado 201 (Created)
    res.status(201).json(newMovie);
  }

  // Método estático para actualizar una película en la base de datos
  static async update(req, res) {
    // Extracción del ID de la película de los parámetros de la solicitud
    const { id } = req.params;

    // Validación del cuerpo de la solicitud utilizando el esquema parcial de película
    const result = validatePartialMovie(req.body);

    // Verificación de errores en la validación
    if (result.error) {
      // En caso de fallo, devolver un error 400 con detalles de validación
      return res
        .status(400)
        .json({ message: JSON.parse(result.error.message) });
    }

    // Actualización de la película en la base de datos utilizando el modelo MovieModel
    const updateMovie = await MovieModel.update({ id, input: result.data });

    // Envío de la película actualizada como respuesta JSON
    return res.json(updateMovie);
  }

  // Método estático para eliminar una película de la base de datos
  static async delete(req, res) {
    // Extracción del ID de la película de los parámetros de la solicitud
    const { id } = req.params;

    // Eliminación de la película de la base de datos utilizando el modelo MovieModel
    const result = await MovieModel.delete({ id });

    // Verificación de si la película fue encontrada y eliminada correctamente
    if (result === false) {
      // En caso de fallo, devolver un error 404 con un mensaje indicando que la película no fue encontrada
      return res.status(404).json({ message: 'Movie not found' })
    }

    // En caso de éxito, devolver un mensaje indicando que la película fue eliminada
    return res.json({ message: 'Movie deleted' })
  }
}