# Bitácora — Café Origen Analítica

## MiniReto 1: Modelado y exploración de datos

### Diccionario de datos

| Propiedad | Tipo de dato | Descripción |
|---|---|---|
| id | Number | Identificador único del registro. |
| fecha | String | Fecha de la venta en formato AAAA-MM-DD. |
| cliente | String | Código identificador del cliente. |
| producto | String | Nombre del producto vendido. |
| ciudad | String | Ciudad donde se registra la venta. |
| cantidad | Number | Número de unidades vendidas. |
| precio | Number | Precio unitario del producto en pesos colombianos. |

### Casos borde detectados

**1. Inconsistencia en los nombres de las ciudades**

El registro 5 contiene la ciudad «medellín» en minúscula, mientras que otros registros contienen «Medellín».

Decisión: normalizar los nombres de las ciudades durante el análisis, sin modificar los datos originales.

**2. Ventas con cantidad igual a cero**

El registro 8 presenta una cantidad de cero unidades.

Decisión: conservar el registro original, pero excluirlo de los indicadores que contabilizan ventas efectivas.

**3. Clientes repetidos**

Los clientes C01, C02 y C03 aparecen en diferentes registros.

Decisión: conservar sus transacciones y evitar contabilizar varias veces al mismo cliente cuando se calculen clientes únicos. La repetición no implica necesariamente un error.

### Pseudocódigo

1. Crear un arreglo de objetos con las ventas.
2. Exportar el arreglo.
3. Importar los datos desde el módulo de exploración.
4. Consultar la cantidad de registros.
5. Consultar el primer y último registro.
6. Consultar el producto ubicado en el índice 4.
7. Mostrar la tabla completa.
8. Identificar y documentar los casos borde.

### Pruebas realizadas

- Ejecución mediante `node src/explorar.js`.
- Cantidad de registros: 12.
- Primer registro: ID 1.
- Último registro: ID 12.
- Producto en el índice 4: Origen Sierra 500 g.
- Visualización correcta de la tabla completa.
- Se corrigió un error inicial relacionado con la ruta de ejecución.

Resultado: ejecución satisfactoria.