// warehouse-producto.ts
export interface WarehouseProducto {
    NombreProducto: string;
    Cantidad: number;
    Fecha: string;
  }
  
  // warehouse-insumo.ts
  export interface WarehouseInsumo {
    NombreInsumo: string;
    Cantidad: number;
    Fecha: string;
  }
  
  // warehouse-ranking-cliente.ts
  export interface WarehouseRankingCliente {
    NombreCliente: string;
    NumeroCompras: number;
  }
  
  // warehouse-venta.ts
  export interface WarehouseVenta {
    NombreProducto: string;
    NumeroVentas: number;
    Fecha: string;
  }
  