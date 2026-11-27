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


## MiniReto 3: Métodos de arreglos, agrupaciones y rankings

### Objetivo

Reescribir los indicadores mediante métodos de arreglos, comprobar su equivalencia con los ciclos manuales y construir agrupaciones y rankings de productos.

### Las cinco preguntas sobre colecciones

| Función | ¿Qué recorro? | ¿Qué filtro? | ¿Qué transformo? | ¿Qué acumulo? | ¿Cómo agrupo? |
|---|---|---|---|---|---|
| totalVendidoM | Ventas | Cantidades mayores que cero | Ventas en valores monetarios | Ingresos totales | No aplica |
| unidadesVendidasM | Ventas | Cantidades mayores que cero | Objetos en cantidades | Unidades vendidas | No aplica |
| ventasPorCiudadM | Ventas | Ciudad solicitada y ventas válidas | Ventas en valores monetarios | Ingresos de una ciudad | No aplica |
| totalPorCiudad | Ventas | Ventas válidas | Nombres de ciudades normalizados | Ingresos | Por ciudad |
| unidadesPorProducto | Ventas | Ventas válidas | Nombre como clave del diccionario | Cantidades | Por producto |
| topProductosPorValor | Ventas | Ventas válidas | Diccionario en arreglo de objetos | Ingresos por producto | Por producto |

### Métodos utilizados

- `filter()`: selecciona las ventas que cumplen una condición.
- `map()`: transforma los elementos de un arreglo.
- `reduce()`: acumula valores y construye agrupaciones.
- `sort()`: ordena productos mediante un criterio numérico descendente.
- `slice()`: selecciona los primeros k elementos.
- `Object.entries()`: convierte las propiedades de un objeto en pares clave-valor.
- Operador de propagación (`...`): crea una copia superficial del arreglo antes de ordenar.

### Decisiones técnicas

- Se conservan las funciones desarrolladas con ciclos manuales.
- Se utiliza un valor inicial explícito en cada reduce.
- Se excluyen registros con cantidad igual a cero.
- Se normalizan las ciudades mediante trim y toLowerCase.
- Los ingresos se calculan reutilizando valorVenta.
- Las agrupaciones utilizan objetos como diccionarios.
- El arreglo original no se modifica durante el ordenamiento.
- Los indicadores numéricos retornan cero ante arreglos vacíos.
- Las agrupaciones vacías retornan un objeto vacío y los rankings vacíos retornan un arreglo vacío.

### Resultados esperados de equivalencia

| Indicador | Ciclos | Métodos |
|---|---:|---:|
| Total vendido | 985000 | 985000 |
| Unidades vendidas | 21 | 21 |
| Ventas Medellín | 356000 | 356000 |

### Agrupación por ciudad

| Ciudad | Ingresos COP |
|---|---:|
| Medellín | 356000 |
| Bogotá | 276000 |
| Cali | 185000 |
| Pereira | 168000 |
| Total | 985000 |

### Ranking por unidades

| Producto | Unidades |
|---|---:|
| Origen Huila 500 g | 7 |
| Origen Nariño 250 g | 6 |
| Origen Sierra 500 g | 5 |
| Prensa francesa | 2 |
| Molino manual | 1 |

### Top 3 productos por ingresos

| Posición | Producto | Ingresos COP |
|---|---|---:|
| 1 | Origen Huila 500 g | 294000 |
| 2 | Origen Sierra 500 g | 225000 |
| 3 | Prensa francesa | 190000 |

### Plan de verificación

Se creó el archivo verificar.js para comparar los resultados de ambos algoritmos, comprobar el comportamiento ante arreglos vacíos, validar la normalización de ciudades y verificar que los datos originales permanezcan intactos.

Comando de ejecución: `node src/verificar.js`.



## MiniReto 4: Integración, depuración y entrega v0.1

### Objetivo

Integrar las funciones de análisis en un reporte de negocio por consola y comprobar la corrección de los errores relacionados con la agrupación de ciudades y el cálculo del ticket promedio.

### Pseudocódigo

1. Importar los datos y las funciones de análisis.
2. Crear una función para formatear valores monetarios.
3. Calcular y mostrar los indicadores generales.
4. Agrupar los ingresos por ciudad.
5. Agrupar y ordenar las unidades por producto.
6. Mostrar los tres productos con mayores ingresos.
7. Filtrar las ventas de una fecha determinada.
8. Comprobar el comportamiento de una fecha sin ventas.
9. Verificar los errores reportados.

### Depuración 1: Ciudades duplicadas

**Síntoma:** Bogotá aparece en dos grupos diferentes.

**Entrada que produce el error:** dos registros con las ciudades "Bogotá" y "Bogotá ", respectivamente.

**Hipótesis:** JavaScript interpreta las cadenas con espacios adicionales como valores diferentes.

**Prueba realizada:** se diseñó una agrupación sin normalización y se comparó con la función totalPorCiudad.

**Causa:** ausencia de normalización antes de utilizar los nombres como claves de un objeto.

**Corrección:** aplicar trim() y toLowerCase() antes de agrupar y generar un nombre uniforme para la presentación.

**Resultado esperado:** un único grupo Bogotá con ingresos de 78000 COP en los datos de prueba.

### Depuración 2: Ticket promedio igual a NaN

**Síntoma:** el ticket promedio muestra NaN cuando no existen ventas.

**Entrada que produce el error:** un arreglo vacío obtenido al consultar la fecha 2026-09-07.

**Hipótesis:** la función realiza una división entre cero.

**Prueba realizada:** se diseñó una comparación entre la operación directa 0/0 y la función ticketPromedio.

**Causa:** ausencia de una validación del contador antes de efectuar la división.

**Corrección:** comprobar si el número de ventas válidas es cero y retornar 0 antes de realizar la operación.

**Resultado esperado:** ticket promedio igual a cero, sin errores en el reporte final.

### Decisiones técnicas

- Se mantienen separados los datos, la lógica de negocio, las pruebas y el reporte.
- Se reutilizan las funciones desarrolladas en los MiniRetos anteriores.
- La función ventasDelDia retorna un arreglo de registros correspondientes a la fecha solicitada.
- Se utiliza toLocaleString("es-CO") para representar los valores monetarios.
- No se modifica el arreglo original.
- Cuando no existe una venta mayor, se muestra el mensaje "Sin ventas".
- Los errores se reproducen de forma controlada en depurar.js, sin incorporarlos al reporte final.

### Resultados esperados del reporte general

| Indicador | Resultado |
|---|---:|
| Registros | 12 |
| Ventas válidas | 11 |
| Total vendido | 985000 COP |
| Unidades vendidas | 21 |
| Venta mayor | 168000 COP |
| Ticket promedio | 89545.45 COP aprox. |
| Ciudades | 4 |

### Pruebas del reporte diario

| Indicador | 2026-09-01 | 2026-09-07 |
|---|---:|---:|
| Registros | 2 | 0 |
| Total vendido | 110000 | 0 |
| Unidades | 3 | 0 |
| Ticket promedio | 55000 | 0 |

### Comandos de verificación

- `node src/explorar.js`
- `node src/pruebas.js`
- `node src/verificar.js`
- `node src/depurar.js`
- `node src/reporte.js`

### Entrega

Versión v0.1 del motor de analítica de Café Origen, desarrollada mediante JavaScript, Node.js y CommonJS, con control de versiones mediante Git y GitHub.


## MiniReto 5: Generación de datos y conteo de operaciones

### Predicciones antes de medir

Se espera que, al multiplicar por diez el número de registros, las funciones que recorren completamente el arreglo aumenten aproximadamente diez veces su número de operaciones.

| Función | Complejidad estimada | Crecimiento esperado |
|---|---|---|
| totalVendido | O(n) | 10 veces |
| ventaMayor | O(n) | Aproximadamente 10 veces |
| totalPorCiudad | O(n) | 10 veces |
| primeraVenta | O(1) | Permanece constante |

### Criterio de medición

Se utilizará un objeto contador para registrar las visitas a elementos y las comparaciones explícitas realizadas por cada algoritmo instrumentado.

Para primeraVenta se contabilizará un acceso directo al arreglo.

No se pretende contabilizar todas las instrucciones internas del motor de JavaScript, sino operaciones representativas del crecimiento de cada algoritmo.



### Resultados de la medición

| Tamaño | totalVendido | ventaMayor | totalPorCiudad | primeraVenta |
|---:|---:|---:|---:|---:|
| 100 | 200 | 399 | 200 | 1 |
| 1000 | 2000 | 3999 | 2000 | 1 |
| 10000 | 20000 | 39999 | 20000 | 1 |
| 100000 | 200000 | 399999 | 200000 | 1 |

### Clasificación de los algoritmos

**totalVendido — O(n)**

Recorre todos los registros una sola vez. Por cada elemento contabiliza una visita y una comparación. El número de operaciones crece proporcionalmente al tamaño del arreglo.

**ventaMayor — O(n)**

Recorre todos los registros para identificar la venta de mayor valor. Aunque realiza más comparaciones, no contiene ciclos anidados. Su crecimiento continúa siendo lineal.

**totalPorCiudad — O(n)**

Recorre las ventas una sola vez y acumula los ingresos utilizando un objeto como diccionario. Las operaciones de acceso al diccionario se consideran de costo constante esperado y los nombres de las ciudades tienen longitud acotada.

**primeraVenta — O(1)**

Accede directamente al índice cero del arreglo sin realizar recorridos. Su número de operaciones no depende del tamaño de la entrada.

### Comparación entre predicciones y resultados

Los resultados esperados respaldan las predicciones iniciales. Las funciones lineales aumentan aproximadamente diez veces su número de operaciones cuando el tamaño del arreglo se multiplica por diez. La función constante conserva una operación independientemente del volumen de datos.

Ninguna de las cuatro funciones presenta complejidad cuadrática.

### Decisiones técnicas

- Se conservaron las funciones originales del motor v0.1.
- Se crearon versiones instrumentadas independientes.
- Se utilizaron objetos para almacenar los contadores.
- Cada medición comienza con un contador inicializado en cero.
- Se mantuvo la estructura original de los registros.
- Se conservaron los precios asociados a cada producto.
- Los datos generados tienen cantidades entre 1 y 5.
- El conteo de operaciones es independiente del tiempo de ejecución.

### Comando de ejecución

`node src/medir.js`