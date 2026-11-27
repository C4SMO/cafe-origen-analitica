// pedir al archivo datos/ que me traiga ventas
const {ventas} = require("./datos");

// muéstrame el tamaño de ventas "recuerda que comienza el conteo desde cero"
console.log(ventas.length)

// Muestra el primer registro de las ventas conteo de el primer termino al ultimo
console.log(ventas[0])

// Muestra el primer registro de las ventas conteo de el ultimo termino, cuenta desde la ultima posición hasta la primera
console.log(ventas[ventas.length - 1])

// Traer la posición 4 de ventas 
console.log(ventas[3].producto)

// 
console.table(ventas)