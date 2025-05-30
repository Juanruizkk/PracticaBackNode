const transporter = require('../helpers/nodemailer');


// Wrap in an async IIFE so we can use await.
const registroUsuario = async (nombre, emailUsuario) => {
  const info = await transporter.sendMail({
    from: `Bienvenido a nuestra pagina <${process.env.GMAIL_USER}>`, // sender address
    to: "juanignacioruizr@gmail.com",
    subject: "Bienvenido ✔",
    html: `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>¡Bienvenido/a, ${nombre}!</h2>
    <p>Gracias por registrarte en nuestra página.</p>
    <p>Esperamos que disfrutes de nuestros servicios.</p>
    <hr>
    <small>Este es un mensaje automático, no respondas a este correo.</small>
  </div>
`, // HTML body
  });
}

module.exports = {registroUsuario}