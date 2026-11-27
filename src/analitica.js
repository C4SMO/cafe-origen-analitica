function valorVenta(venta) {
    if (!venta) {
        return 0;
    }

    return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
    let total = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += valorVenta(venta);
        }
    }

    return total;
}

function unidadesVendidas(ventas) {
    let unidades = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            unidades += venta.cantidad;
        }
    }

    return unidades;
}

function ventaMayor(ventas) {
    let mayor = null;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            if (mayor === null ||
                valorVenta(venta) > valorVenta(mayor)) {

                mayor = venta;
            }
        }
    }

    return mayor;
}

function ticketPromedio(ventas) {
    let contador = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            contador++;
        }
    }

    if (contador === 0) {
        return 0;
    }

    return totalVendido(ventas) / contador;
}

function ventasPorCiudad(ventas, ciudad) {
    let total = 0;

    const ciudadBuscada = ciudad.trim().toLowerCase();

    for (const venta of ventas) {
        const ciudadVenta = venta.ciudad.trim().toLowerCase();

        if (ciudadVenta === ciudadBuscada && venta.cantidad > 0) {
            total += valorVenta(venta);
        }
    }

    return total;
}


module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad
};