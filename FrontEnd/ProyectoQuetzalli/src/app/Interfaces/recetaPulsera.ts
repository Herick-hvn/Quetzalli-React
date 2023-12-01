export interface Material {
  idPulseraMaterial: number;
  idRecetaPulsera: number;
  idMaterial: number;
  cantidad: number;
  // Otros campos relacionados con los materiales
}

export interface RecetaPulsera {
  idRecetaPulsera: number;
  nombre: string;
  descripcion: string;
  foto: string;
  costoProduccion: number;
  precioVenta: number;
  observaciones: string;
  estatus: string;
  materiales?: Material[];
}
