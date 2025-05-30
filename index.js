require("dotenv").config();
const Server = require("./server/config");

const server = new Server();

server.listen();


/* 
const productos = [
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
];
 */