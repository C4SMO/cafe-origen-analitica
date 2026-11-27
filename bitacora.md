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




## MiniReto 2: Indicadores mediante ciclos manuales

### Plan en pseudocódigo

#### valorVenta

- Recibir un objeto que represente una venta.
- Multiplicar la cantidad por el precio unitario.
- Retornar el resultado.

#### totalVendido

- Inicializar un acumulador total en 0.
- Recorrer el arreglo de ventas.
- Si la cantidad es mayor que 0, calcular el valor de la venta.
- Sumar el resultado al acumulador.
- Retornar el total.

#### unidadesVendidas

- Inicializar un acumulador de unidades en 0.
- Recorrer las ventas.
- Si la cantidad es mayor que 0, sumar las unidades.
- Retornar el acumulador.

#### ventaMayor

- Inicializar la venta mayor en null.
- Recorrer las ventas válidas.
- Comparar el valor de la venta actual con el mayor registrado.
- Si es superior o todavía no existe un máximo, guardar el registro actual.
- Retornar el registro completo.

#### ticketPromedio

- Inicializar un contador en 0.
- Recorrer el arreglo.
- Incrementar el contador por cada venta con cantidad mayor que 0.
- Obtener el total vendido.
- Si el contador es 0, retornar 0.
- Dividir el total vendido entre el contador.
- Retornar el resultado.

#### ventasPorCiudad

- Inicializar un acumulador en 0.
- Normalizar la ciudad solicitada.
- Recorrer las ventas.
- Normalizar la ciudad de cada registro.
- Si las ciudades coinciden y la venta es válida, acumular su valor.
- Retornar el total.

### Decisiones sobre casos borde

- Los datos originales no serán modificados.
- Las ventas con cantidad igual a cero no se consideran ventas efectivas.
- Las ciudades se normalizan mediante trim() y toLowerCase().
- Los indicadores numéricos retornan 0 cuando el arreglo está vacío.
- ventaMayor retorna null cuando no existen ventas válidas.
- En caso de empate en la venta mayor, se conserva el primer registro encontrado.
- valorVenta recibe un objeto individual, no un arreglo. Si no existe el registro, retorna 0.


### Tabla de traza 1: totalVendido

Valor inicial del acumulador: 0.

| ID | Cantidad | Precio | Valor venta | Acumulador |
|---|---:|---:|---:|---:|
| 1 | 2 | 42000 | 84000 | 84000 |
| 2 | 1 | 26000 | 26000 | 110000 |
| 3 | 1 | 95000 | 95000 | 205000 |
| 4 | 1 | 42000 | 42000 | 247000 |
| 5 | 3 | 45000 | 135000 | 382000 |
| 6 | 2 | 26000 | 52000 | 434000 |
| 7 | 1 | 120000 | 120000 | 554000 |
| 8 | 0 | 42000 | 0 | 554000 |
| 9 | 2 | 45000 | 90000 | 644000 |
| 10 | 4 | 42000 | 168000 | 812000 |
| 11 | 1 | 95000 | 95000 | 907000 |
| 12 | 3 | 26000 | 78000 | 985000 |

Resultado esperado: 985000 COP.

El registro 8 no modifica el acumulador porque su cantidad es cero.

### Tabla de traza 2: ventaMayor

Valor inicial de la variable mayor: null.

| ID | Valor actual | Máximo acumulado | ID del máximo |
|---|---:|---:|---:|
| 1 | 84000 | 84000 | 1 |
| 2 | 26000 | 84000 | 1 |
| 3 | 95000 | 95000 | 3 |
| 4 | 42000 | 95000 | 3 |
| 5 | 135000 | 135000 | 5 |
| 6 | 52000 | 135000 | 5 |
| 7 | 120000 | 135000 | 5 |
| 8 | 0 | 135000 | 5 |
| 9 | 90000 | 135000 | 5 |
| 10 | 168000 | 168000 | 10 |
| 11 | 95000 | 168000 | 10 |
| 12 | 78000 | 168000 | 10 |

Resultado esperado: registro ID 10, correspondiente al producto Origen Huila 500 g, con un valor total de 168000 COP.

### Resultados esperados de las pruebas

| Función | Arreglo completo | Un elemento | Vacío |
|---|---:|---:|---:|
| valorVenta (primer registro) | 84000 | 84000 | 0 |
| totalVendido | 985000 | 84000 | 0 |
| unidadesVendidas | 21 | 2 | 0 |
| ventaMayor | ID 10 | ID 1 | null |
| ticketPromedio | 89545.45 aprox. | 84000 | 0 |
| ventasPorCiudad | 356000 | 84000 | 0 |

### Decisiones técnicas

- Se utilizaron exclusivamente ciclos for...of para recorrer los arreglos.
- No se utilizaron los métodos map, filter ni reduce.
- Se excluyen las ventas con cantidad igual a cero de los indicadores de ventas efectivas.
- Se utiliza trim() y toLowerCase() para normalizar las ciudades.
- Se evita la división entre cero en ticketPromedio.
- Se retorna null cuando no existe una venta mayor.
- Se reutiliza valorVenta para evitar duplicar operaciones.
- Se separan las pruebas de las funciones de análisis mediante pruebas.js.
- Se conservan los datos originales.

### Comando de ejecución

`node src/pruebas.js`