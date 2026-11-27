
const ventas = require("./datos.js");

const {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
} = require("./analitica.js");


// Formato de moneda colombiana
function moneda(valor) {
    return "$" + valor.toLocaleString("es-CO", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }) + " COP";
}


// Encabezados del reporte
function seccion(titulo) {
    console.log("\n" + "=".repeat(65));
    console.log(titulo);
    console.log("=".repeat(65));
}


// Resumen reutilizable
function mostrarResumen(datos) {
    const mayor = ventaMayor(datos);

    console.log(`Registros:          ${datos.length}`);
    console.log(`Total vendido:      ${moneda(totalVendido(datos))}`);
    console.log(`Unidades vendidas:  ${unidadesVendidas(datos)}`);
    console.log(`Ticket promedio:    ${moneda(ticketPromedio(datos))}`);

    if (mayor === null) {
        console.log("Venta mayor:        Sin ventas");
    } else {
        console.log(`Venta mayor:        ${moneda(valorVenta(mayor))}`);
        console.log(`Producto:           ${mayor.producto}`);
    }
}


// Encabezado principal
seccion("CAFÉ ORIGEN | MOTOR DE ANALÍTICA v0.1");


// 1. Resumen general
seccion("1. RESUMEN GENERAL");

mostrarResumen(ventas);


// 2. Ventas por ciudad
seccion("2. INGRESOS POR CIUDAD");

const ciudades = Object.entries(totalPorCiudad(ventas))
    .sort((a, b) => b[1] - a[1])
    .map(([ciudad, total]) => ({
        Ciudad: ciudad,
        Ingresos: moneda(total)
    }));

console.table(ciudades);


// 3. Unidades por producto
seccion("3. UNIDADES VENDIDAS POR PRODUCTO");

const productos = Object.entries(unidadesPorProducto(ventas))
    .sort((a, b) => b[1] - a[1])
    .map(([producto, unidades]) => ({
        Producto: producto,
        Unidades: unidades
    }));

console.table(productos);


// 4. Top 3 productos por ingresos
seccion("4. TOP 3 PRODUCTOS POR INGRESOS");

const ranking = topProductosPorValor(ventas, 3)
    .map((item, indice) => ({
        Posicion: indice + 1,
        Producto: item.producto,
        Ingresos: moneda(item.total)
    }));

console.table(ranking);


// 5. Análisis de un día con ventas
seccion("5. REPORTE DIARIO | 2026-09-01");

mostrarResumen(ventasDelDia(ventas, "2026-09-01"));


// 6. Análisis de un día sin ventas
seccion("6. REPORTE DIARIO | 2026-09-07");

mostrarResumen(ventasDelDia(ventas, "2026-09-07"));


// Fin del reporte
seccion("FIN DEL REPORTE | CAFÉ ORIGEN v0.1");
