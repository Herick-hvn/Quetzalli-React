import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Insumo } from 'src/app/Interfaces/Insumo';
import { Proveedor } from 'src/app/Interfaces/proveedor';
import { InsumosService } from 'src/app/services/insumos/insumos.service';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';


@Component({
  selector: 'app-agregar-insumo',
  templateUrl: './agregar-insumo.component.html',
  styleUrls: ['./agregar-insumo.component.scss']
})
export class AgregarInsumoComponent {
  proveedores: Proveedor[] = [];

  constructor(
    private insumosService: InsumosService,
    private proveedoresService: ProveedoresService,
    public dialogRef: MatDialogRef<AgregarInsumoComponent>
  ) {
    this.obtenerProveedores();
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

  crearInsumo(): void {
    const nombreInsumo = (document.getElementById('nombreInsumo') as HTMLInputElement).value;
    const proveedorId = parseInt((document.getElementById('proveedor') as HTMLSelectElement).value);
    const cantidad = parseInt((document.getElementById('cantidad') as HTMLInputElement).value);
    const unidad = (document.getElementById('unidad') as HTMLInputElement).value;
    const precio = parseFloat((document.getElementById('precio') as HTMLInputElement).value);

    const nuevoInsumo: Insumo = {
      idinsumo: 0,
      nombreInsumo: nombreInsumo,
      idProveedor: proveedorId,
      cantidad: cantidad,
      unidad: unidad,
      precio: precio,
      estatus: '1' // Establecer el estatus como activo
    };

    this.insumosService.addInsumo(nuevoInsumo).subscribe(
      () => {
        alert('El insumo se agregó correctamente');
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error al agregar insumo:', error);
        alert('No se pudo agregar el insumo');
      }
    );
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  formularioValido(): boolean {
    const nombreInsumo = (document.getElementById('nombreInsumo') as HTMLInputElement).value;
    const proveedorId = parseInt((document.getElementById('proveedor') as HTMLSelectElement).value);
    const cantidad = parseInt((document.getElementById('cantidad') as HTMLInputElement).value);
    const unidad = (document.getElementById('unidad') as HTMLInputElement).value;
    const precio = parseFloat((document.getElementById('precio') as HTMLInputElement).value);

    return nombreInsumo && proveedorId && cantidad && unidad && precio ? true : false;
  }
}
