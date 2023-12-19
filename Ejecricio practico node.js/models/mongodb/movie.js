// Importación de las funciones y clases necesarias de la biblioteca MongoDB
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
// Importación de la configuración de variables de entorno utilizando dotenv
import "dotenv/config";

// Extracción de las variables de entorno para el usuario y la contraseña de MongoDB
const USER = process.env.MONGODB_USER;
const PASSWORD = process.env.MONGODB_PASSWORD;

// Construcción de la cadena de conexión a MongoDB utilizando las variables de entorno
const uri = `mongodb+srv://${USER}:${PASSWORD}@dbtest.ywsner5.mongodb.net/`;

// Creación de un cliente MongoClient con opciones específicas, incluida la versión de la API del servidor
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,  // Utiliza la versión 1 de la API del servidor
    strict: true,
    deprecationErrors: true,
  },
});

// Función asincrónica para conectar a la base de datos y devolver la colección deseada
async function connect() {
  try {
    // Conexión al servidor de MongoDB
    await client.connect();
    
    // Selección de la base de datos y la colección
    const database = client.db("Test");
    return database.collection("BackendTest");
  } catch (error) {
    // Manejo de errores en caso de problemas durante la conexión
    console.error("Error connecting to the database");
    console.error(error);
    
    // Cierre de la conexión en caso de error
    await client.close();
  }
}

// Definición de una clase MovieModel para realizar operaciones en la colección "BackendTest"
export class MovieModel {
  // Método estático para obtener todos los documentos de la colección
  static async readAll() {
    const db = await connect();

    return db.find({}).toArray();
  }

  // Método estático para insertar un nuevo documento en la colección
  static async create({ input }) {
    const db = await connect();

    const { insertedId } = await db.insertOne(input);

    return {
      id: insertedId,
      ...input,
    };
  }

  // Método estático para eliminar un documento en base a su ID
  static async delete({ id }) {
    const db = await connect();
    const objectId = new ObjectId(id);
    const { deletedCount } = await db.deleteOne({ _id: objectId });
    return deletedCount > 0;
  }

  // Método estático para actualizar un documento en base a su ID
  static async update({ id, input }) {
    const db = await connect();
    const objectId = new ObjectId(id);

    const { ok, value } = await db.findOneAndUpdate(
      { _id: objectId },
      { $set: input },
      { returnNewDocument: true }
    );

    if (!ok) return false;

    return value;
  }
}