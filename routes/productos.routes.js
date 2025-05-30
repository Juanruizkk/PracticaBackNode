const express = require("express");

const { obtenerProductoPorIdOTodos, crearProducto, editarProducto, borrarProducto } = require("../controllers/producto.controllers");
const { check } = require("express-validator");
const router = express.Router();
const auth = require('../middlewares/auth');


/* GET, si mando el / solo llego a api/productos*/
router.get("/", obtenerProductoPorIdOTodos);
router.get("/:id", obtenerProductoPorIdOTodos);

/* POST */

router.post("/", [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty(),

],auth('admin'),crearProducto);

/* PUT - Editar */

router.put("/:id",[
     check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty(),
],auth('admin'), editarProducto);

/* DELETE - Borrar */

router.delete("/:id",auth('admin'), borrarProducto);


module.exports = router;