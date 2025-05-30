/* Ventajas de usar clases:

Mejor organización y escalabilidad.
Puedes crear múltiples instancias si lo necesitas.
Más fácil de mantener y testear.
Permite separar responsabilidades (middlewares, rutas, configuración).

*/

require('../db/config')
const express = require("express");
/* Cors es para habilitar que se le hagan peticiones al servidor */
const cors = require("cors");
const morgan = require("morgan");



class Server {
  constructor() {
    this.app = express();
    /* Process es un atributo donde estan las vrbles de entorno */
    this.port = process.env.PORT || 8080;
    /* Los middlewares deben ir antes de las rutas,  son funciones que se ejecutan durante el ciclo de vida de una solicitud HTTP, antes de que la respuesta sea enviada al cliente.
    Los middlewares tambien pueden ir entre la ruta y el controlador */
    this.middlewares();
    this.rutas();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    /* Morgan: Sirve para registrar en la consola todas las peticiones HTTP que recibe tu servidor  */
    this.app.use(morgan("dev"));
  }

  rutas() {
   /* uso un middleware para diferenciar las rutas, todas las rutas que comienzan /api/productos me llevan al archivo de rutas*/
   this.app.use("/api/productos", require("../routes/productos.routes"));
   this.app.use("/api/usuarios", require("../routes/usuarios.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
