const serviciosProductos = require("../services/productos.services");
const { validationResult } = require("express-validator");
const obtenerProductoPorIdOTodos = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id : req.query.id;
    const limit = req.query.limit || 10;
    const to = req.query.to || 0;
    if (id) {
      const producto = await serviciosProductos.obtenerUnProducto(id); // Usa await y no Number(id)
      if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.status(200).json(producto);
    } else {


      const productos = await serviciosProductos.obtenerTodosLosProductos(limit,to); // Usa await
      res.status(200).json(productos);




    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const crearProducto = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const resultado = await serviciosProductos.nuevoProducto(req.body);
      res.status(201).json(resultado);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const editarProducto = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const prodEditado = await serviciosProductos.editarProductoService(
        idParams,
        req.body
      );
      if (!prodEditado) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.status(200).json(prodEditado);
    }

    const idParams = req.params.id;
  } catch (error) {
    res.status(500).json(error);
  }
};

const borrarProducto = async (req, res) => {
  try {
    const idParams = req.params.id;
    const productoEliminado = serviciosProductos.eliminarProducto(idParams);
    if (!productoEliminado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  obtenerProductoPorIdOTodos,
  crearProducto,
  editarProducto,
  borrarProducto,
};
