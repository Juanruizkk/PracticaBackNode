/* Aca verificaremos antes de que la informacion pase al controlador si es que tiene los permisos, es decir el token */

const jwt = require("jsonwebtoken");

/* Esta funcion toma el nombre del archivo */
module.exports = (rol) => (req,res, next) => {
    try {
        /* headers - body - query - params */
        /* el token se manda por la cabecera */
         /* const token = req.headers('auth'); */
         const token = req.header('auth');

        if (!token) {
            return res.status(409).json({ msg: "Token incorrecto" });
            
        }

         const verify = jwt.verify(token, process.env.JWT_SECRET);

        /*  if (verify.includes('invalid')) {
             return res.status(409).json({ msg: "Token incorrecto" });
         } */

         if(rol === verify.rol){
            return next();
         } else{
            return res.status(401).json({ error: "No tienes permisos para acceder a este recurso" });
         }        

    } catch (error) {
        console.log(error);
    }
}