export interface Pedido {
    "idPedidos": number,
    "idCliente": number,
    "fechaPedido": string,
    "fechaEntrega": string,
    "total": number,
    "estatus": number
}

export interface Pedido2 {
    "idPedidos": number,
    "idCliente": number,
    "fechaPedido": string,
    "fechaEntrega": string,
    "codigo": number,
    "estatus": number,
    "colonia": string,
    "calle": string,
    "nE": string,
    "nI": string,
    "CP": number
    
}