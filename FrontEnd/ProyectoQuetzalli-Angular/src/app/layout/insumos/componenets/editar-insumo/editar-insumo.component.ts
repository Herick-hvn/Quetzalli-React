import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Insumo } from 'src/app/Interfaces/Insumo';
import { Proveedor } from 'src/app/Interfaces/proveedor';
import { InsumosService } from 'src/app/services/insumos/insumos.service';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';

@Component({
  selector: 'app-editar-insumo',
  templateUrl: './editar-insumo.component.html',
  styleUrls: ['./editar-insumo.component.scss']
})
export class EditarInsumoComponent {
  insumo: Insumo = {
    idinsumo: 0,
    nombreInsumo: '',
    idProveedor: 0,
    cantidad: 0,
    unidad: '',
    precio: 0,
    estatus: '1',
    nombreProveedor:'',
  };
  proveedores: Proveedor[] = [];

  constructor(
    private insumosService: InsumosService,
    private proveedoresService: ProveedoresService,
    public dialogRef: MatDialogRef<EditarInsumoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { insumoId: number }
  ) {
    this.obtenerProveedores();
    this.obtenerInsumo(data.insumoId);
  }

  obtenerProveedores(): void {
    this.proveedoresService.getProveedores().subscribe(
      (proveedores) => {
        this.proveedores = proveedores;
      },
      (error) => {
        console.error('Error al obtener proveedores:', error);
      }
    );
  }

  obtenerInsumo(id: number): void {
    this.insumosService.getInsumo(id).subscribe(
      (insumo: Insumo | null) => {
        if (insumo !== null) {
          this.insumo = insumo;
        } else {
          console.error('No se pudo obtener la información del insumo.');
        }
      },
      (error) => {
        console.error('Error al obtener la información del insumo:', error);
      }
    );
  }

  guardarCambios(): void {
    this.insumosService.updateInsumo(this.insumo.idinsumo, this.insumo).subscribe(
      () => {
        alert('Insumo actualizado exitosamente');
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error al actualizar insumo:', error);
        alert('No se pudo actualizar el insumo');
      }
    );
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  formularioValido(): boolean {
    const nombreInsumo = this.insumo.nombreInsumo;
    const proveedorId = this.insumo.idProveedor;
    const cantidad = this.insumo.cantidad;
    const unidad = this.insumo.unidad;
    const precio = this.insumo.precio;
  
    return nombreInsumo && proveedorId && cantidad && unidad && precio ? true : false;
  }
  
}
