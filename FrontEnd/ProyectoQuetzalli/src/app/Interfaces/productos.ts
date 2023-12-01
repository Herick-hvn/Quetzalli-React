export interface Productos {
    "idproductos": number,
    "nombreProducto": string,
    "descripcion": string,
    "foto": string,
    "costoProduccion": number,
    "precioVenta": number,
    "observaciones": string,
    "cantidad": number,
    "estatus": string
}

export interface PostProductos {
    "nombreProducto": string,
    "descripcion": string,
    "foto": string,
    "costoProduccion": number,
    "precioVenta": number,
    "observaciones": string,
    "idStock": number,
    "estatus": number
}
