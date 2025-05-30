const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombreUsuario: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    contrasena: { // Asegúrate de usar este nombre en todo tu código
        type: String,
        required: true,
        trim: true,
    },
    rol: {
        type: String,
        default: 'usuario',
        enum: ['usuario', 'admin']
    },
    bloqueado: {
        type: Boolean,
        default: false,
    }, 
});

/* Saco la contrasena del schema asi no se envia */
// Esto es para que no se envíe la contraseña al cliente
UsuarioSchema.methods.toJSON = function () {
    const { contrasena, __v, ...usuario } = this.toObject();
    return usuario;
};

const UsuarioModel = mongoose.model('user', UsuarioSchema);

module.exports = UsuarioModel;