/* const productos = [
  {
    id: 1,
    title: "Escuadra",
    price: 123.45,
  },
  {
    id: 2,
    title: "Calculadora",
    price: 234.56,
  },
  {
    id: 3,
    title: "Globo Terráqueo",
    price: 345.67,
  },
]; */

const ProductModel = require("../models/producto.schema");

const obtenerUnProducto = async (id) => {
  const todosLosProd = await ProductModel.findById(id);
  return todosLosProd;
};

const obtenerTodosLosProductos = async (limit,to) => {
 
  /* El skip es el desde por asi decir y el limit el hasta*/
  /* Si los productos tuvieran la propiedad activo, se los podria filtrar con esto:
  ProductModel.find({activo: true})
  y para contar los activos es:
  ProductModel.countDocuments({activo: true}) */
  const [productos, cantidadTotal] = await Promise.all([
    ProductModel.find()
    .skip(to*limit).
    limit(limit),
    ProductModel.countDocuments()
  ])
  const paginacion = {
    productos,
    cantidadTotal
  }

  return paginacion;
    
};

const nuevoProducto = async (producto) => {
  try {
   /*  const nuevoId = productos[productos.length - 1].id + 1;
    const nuevoProducto = { id: nuevoId, ...producto };
    productos.push(nuevoProducto);
    return nuevoProducto; */
    const newProduct = new ProductModel(producto);
    const savedProduct = await newProduct.save();
    return savedProduct;
    console.log(savedProduct);
  } catch (error) {
    console.log(error);
  }
};

const editarProductoService = async (id, producto) => {
   try {
    const productoEditado = await ProductModel.findByIdAndUpdate(
      id,
      producto,
      { new: true } // Devuelve el documento actualizado
    );
    return productoEditado; // Puede ser null si no existe
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const eliminarProducto = async (id) => {
  try {
    const productoEliminado = await ProductModel.findByIdAndDelete(id)
    return productoEliminado;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  obtenerTodosLosProductos,
  obtenerUnProducto,
  nuevoProducto,
  editarProductoService,
  eliminarProducto
};
