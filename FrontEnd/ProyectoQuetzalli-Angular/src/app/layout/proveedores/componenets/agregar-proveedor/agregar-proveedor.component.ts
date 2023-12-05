import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';
import { Proveedor } from 'src/app/Interfaces/proveedor';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.scss']
})
export class AgregarProveedorComponent {
  constructor(private proveedoresService: ProveedoresService, public dialogRef: MatDialogRef<AgregarProveedorComponent>) {}

  crearProveedor(): void {
    const nombreEmpresa = (document.getElementById('nombreEmpresa') as HTMLInputElement).value;
    const nombreContacto = (document.getElementById('nombreContacto') as HTMLInputElement).value;
    const correo = (document.getElementById('correo') as HTMLInputElement).value;
    const telefono = (document.getElementById('telefono') as HTMLInputElement).value;

    const nuevoProveedor: Proveedor = {
      idproveedor: 0,
      nombreEmpresa: nombreEmpresa,
      nombreContacto: nombreContacto,
      correo: correo,
      telefono: telefono,
      estatus: '1', // Establecer el estatus como activo
    };

    this.proveedoresService.addProveedor(nuevoProveedor).subscribe(
      () => {
        alert('El proveedor se agregó correctamente');
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error al agregar proveedor:', error);
        alert('No se pudo agregar el proveedor');
      }
    );
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  formularioValido(): boolean {
    const nombreEmpresa = (document.getElementById('nombreEmpresa') as HTMLInputElement).value;
    const nombreContacto = (document.getElementById('nombreContacto') as HTMLInputElement).value;
    const correo = (document.getElementById('correo') as HTMLInputElement).value;
    const telefono = (document.getElementById('telefono') as HTMLInputElement).value;

    return nombreEmpresa && nombreContacto && correo && telefono ? true : false;
  }
}
