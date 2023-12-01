import { Proveedor } from "./proveedor";

export interface Insumo {
    idinsumo: number;
    nombreInsumo: string;
    idProveedor: number;
    cantidad: number;
    unidad: string;
    precio: number;
    estatus: string;
    nombreProveedor?: string;
}


