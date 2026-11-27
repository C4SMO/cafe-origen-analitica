# Café Origen Analítica

Motor de analítica de ventas desarrollado con JavaScript y Node.js para Café Origen.

## Versión 0.1 — En desarrollo

El proyecto busca responder preguntas de negocio mediante el procesamiento de arreglos de objetos.

## Estructura

- `src/datos.js`: historial de ventas.
- `src/analitica.js`: funciones de análisis.
- `src/explorar.js`: exploración de datos.
- `bitacora.md`: documentación técnica y decisiones.

## Tecnologías

- JavaScript
- Node.js
- CommonJS
- Git y GitHub

## Ejecución

Desde la raíz del proyecto:

`node src/explorar.js`


## MiniReto 2 — Indicadores de negocio

Se implementaron seis funciones de análisis mediante ciclos manuales:

- `valorVenta()`
- `totalVendido()`
- `unidadesVendidas()`
- `ventaMayor()`
- `ticketPromedio()`
- `ventasPorCiudad()`

Se aplicaron los patrones contador, acumulador y máximo, incluyendo el manejo de arreglos vacíos y la normalización de ciudades.

### Ejecutar las pruebas

`node src/pruebas.js`


## MiniReto 3 — Métodos de arreglos y rankings

Se incorporaron versiones de los indicadores mediante map, filter y reduce, junto con nuevas funciones de agrupación y clasificación.

### Nuevas funcionalidades

- Total vendido mediante métodos de arreglo.
- Unidades vendidas mediante métodos de arreglo.
- Ingresos por ciudad.
- Agrupación de unidades por producto.
- Ranking de productos por ingresos.
- Verificación de equivalencia entre algoritmos.
- Comprobación de integridad de los datos originales.

### Ejecutar las verificaciones

`node src/verificar.js`