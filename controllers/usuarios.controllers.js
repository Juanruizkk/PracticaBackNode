const serviciosUsuarios = require("../services/usuarios.services");
const bycrypt = require("bcrypt");


const { validationResult } = require("express-validator");
const { token } = require("morgan");

const registrarUsuario = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { nombreUsuario, contrasena, rol, bloqueado } = req.body;

      if (await serviciosUsuarios.existeUsuarioPorNombre(nombreUsuario)) {
        return res
          .status(400)
          .json({ error: "El nombre de usuario ya existe" });
      }
      const newUsuario = {
        nombreUsuario,
        contrasena,
        rol,
        bloqueado: bloqueado || false,
      };

      const usuarioGuardado = await serviciosUsuarios.registrarUsuario(
        newUsuario
      );
      res.status(201).json(usuarioGuardado);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const inicioSesionUsuario = async (req, res) => {
  try {
    const resultado = await serviciosUsuarios.iniciarSesion(req.body);

    if (!resultado.user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    if (resultado.user === false) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.status(200).json({ message: "Login exitoso", token: resultado.token });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuarios = await serviciosUsuarios.obtenerTodosLosUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json(error);
  }
};

const obtenerUnUsuarioPorId = async (req, res) => {
  try {
    const id = req.params.idUsuario;
    const usuario = await serviciosUsuarios.obtenerUnUsuarioPorId(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json(error);
  }
};

const bajaFisicaUsuario = async (req, res) => {
  try {
    const id = req.params.idUsuario;
    const eliminado = await serviciosUsuarios.bajaFisicaUsuario(id);
    if (!eliminado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

const bajaLogicaUsuario = async (req, res) => {
  try {
    const id = req.params.idUsuario;
    const usuario = await serviciosUsuarios.bajaLogicaUsuario(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const mensaje = usuario.bloqueado
      ? "Usuario bloqueado"
      : "Usuario desbloqueado";
    res.status(200).json({ mensaje, usuario });
  } catch (error) {
    res.status(500).json({ error: "Error al dar de baja el usuario" });
  }
};

module.exports = {
  registrarUsuario,
  obtenerTodosLosUsuarios,
  obtenerUnUsuarioPorId,
  bajaFisicaUsuario,
  bajaLogicaUsuario,
  inicioSesionUsuario,
};
