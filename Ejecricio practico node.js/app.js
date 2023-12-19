// Importación de Express y la función json para manejar datos JSON
import express, { json } from "express";
// Importación del middleware de CORS para permitir solicitudes desde diferentes dominios
import cors from "cors";
// Importación del enrutador movieRouter que gestiona las rutas relacionadas con las películas
import { movieRouter } from "./routes/movie.js";
// Importación de la configuración de variables de entorno utilizando dotenv
import "dotenv/config";

// Creación de una instancia de la aplicación Express
const app = express();

// Desactivación de la información de la cabecera "x-powered-by" por motivos de seguridad
app.disable("x-powered-by");
// Uso del middleware json para analizar datos JSON en las solicitudes
app.use(json());
// Uso del middleware de CORS para permitir solicitudes desde diferentes dominios
app.use(cors());

// Configuración de la ruta base "/movie" para que utilice el enrutador movieRouter
app.use("/movie", movieRouter);

// Definición del puerto en el que se ejecutará el servidor, utilizando el valor de la variable de entorno PORT o el valor predeterminado 3000
const PORT = process.env.PORT ?? 3000;

// Inicio del servidor Express y escucha en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});