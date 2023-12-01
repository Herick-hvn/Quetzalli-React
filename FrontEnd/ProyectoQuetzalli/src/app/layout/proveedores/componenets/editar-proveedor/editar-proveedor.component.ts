import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';
import { Proveedor } from 'src/app/Interfaces/proveedor';

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.scss']
})
export class EditarProveedorComponent {
  proveedor: Proveedor = {
    idproveedor: 0,
    nombreEmpresa: '',
    nombreContacto: '',
    correo: '',
    telefono: '',
    estatus: '1'
  };

  constructor(
    private proveedoresService: ProveedoresService,
    public dialogRef: MatDialogRef<EditarProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { proveedorId: number }
  ) {
    this.obtenerProveedor(data.proveedorId);
  }

  obtenerProveedor(id: number): void {
    this.proveedoresService.getProveedor(id).subscribe(
      (proveedor: Proveedor | null) => {
        if (proveedor !== null) {
          this.proveedor = proveedor;
        } else {
          console.error('No se pudo obtener la información del proveedor.');
        }
      },
      (error) => {
        console.error('Error al obtener la información del proveedor:', error);
      }
    );
  }

  guardarCambios(): void {
    this.proveedoresService.updateProveedor(this.proveedor.idproveedor, this.proveedor).subscribe(
      () => {
        alert('Proveedor actualizado exitosamente');
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error al actualizar proveedor:', error);
        alert('No se pudo actualizar el proveedor');
      }
    );
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  formularioValido(): boolean {
    return this.proveedor ? true : false;
  }
}
