const UsuarioModel = require("../models/usuario.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registroUsuario } = require("../helpers/mensajes");
// Obtener todos los usuarios
const obtenerTodosLosUsuarios = async () => {
  return await UsuarioModel.find();
};

// Obtener un usuario por ID
const obtenerUnUsuarioPorId = async (id) => {
  return await UsuarioModel.findById(id);
};

// Verificar si existe un usuario por email
const existeUsuarioPorEmail = async (email) => {
  return await UsuarioModel.findOne({ email });
};

// Verificar si existe un usuario por nombre de usuario
const existeUsuarioPorNombre = async (nombreUsuario) => {
  return await UsuarioModel.findOne({ nombreUsuario });
};

// Registrar un nuevo usuario

const registrarUsuario = async (usuario) => {
  // Hashea la contraseña aquí
  const salt = bcrypt.genSaltSync();
  const passEncrypted = bcrypt.hashSync(usuario.contrasena, salt);

  const nuevoUsuario = new UsuarioModel({
    ...usuario,
    contrasena: passEncrypted,
  });


  registroUsuario(usuario.nombreUsuario);

  return await nuevoUsuario.save();
};
// Baja física (eliminar usuario)
const bajaFisicaUsuario = async (id) => {
  return await UsuarioModel.findByIdAndDelete(id);
};

// Baja lógica (bloquear/desbloquear usuario)
const bajaLogicaUsuario = async (id) => {
  const usuario = await UsuarioModel.findById(id);
  if (!usuario) return null;
  usuario.bloqueado = !usuario.bloqueado;
  await usuario.save();
  return usuario;
};

const iniciarSesion = async (body) => {
  const usuarioExiste = await UsuarioModel.findOne({
    nombreUsuario: body.nombreUsuario,
  });
  if (!usuarioExiste) return { user: null };

  const passwordOk = await bcrypt.compare(body.contrasena, usuarioExiste.contrasena);
  if (!passwordOk) return { user: false };

  const payload = {
    _id: usuarioExiste._id,
    rol: usuarioExiste.rol,
    bloqueado: usuarioExiste.bloqueado,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  return { user: usuarioExiste, token };
};

module.exports = {
  obtenerTodosLosUsuarios,
  obtenerUnUsuarioPorId,
  existeUsuarioPorEmail,
  existeUsuarioPorNombre,
  registrarUsuario,
  bajaFisicaUsuario,
  bajaLogicaUsuario,
  iniciarSesion,
};
