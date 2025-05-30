const mongoose = require('mongoose');

try {
    mongoose.connect(process.env.MONGODB_CONNECT)
    .then(() => {
        console.log('Conectado a la base de datos');
    })
} catch (error) {
    console.log(error);
}

module.exports =mongoose;