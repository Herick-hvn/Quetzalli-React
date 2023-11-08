import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';
import { AgregarProveedorComponent } from './componenets/agregar-proveedor/agregar-proveedor.component';
import { EditarProveedorComponent } from './componenets/editar-proveedor/editar-proveedor.component';
import { Proveedor } from 'src/app/Interfaces/proveedor';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss'],
})
export class ProveedoresComponent implements OnInit {
  proveedores: Proveedor[] = [];
  dataSource: MatTableDataSource<Proveedor>;
  showNoDataRow: boolean = false;

  displayedColumns: string[] = [
    'nombreEmpresa',
    'nombreContacto',
    'correo',
    'telefono',
    'estatus',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private proveedoresService: ProveedoresService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Proveedor>([]);
  }

  ngOnInit(): void {
    this.obtenerProveedores();
    this.applyFilter();
  }

  obtenerProveedores(): void {
    this.proveedoresService.getProveedores().subscribe({
      next: (proveedores) => {
        this.proveedores = proveedores;
        this.dataSource.data = this.proveedores;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log('Error al obtener la lista de proveedores:', error);
      },
    });
  }

  abrirDialogoAgregarProveedor(): void {
    const dialogRef = this.dialog.open(AgregarProveedorComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.obtenerProveedores();
    });
  }

  abrirDialogoEditarProveedor(id: number): void {
    const dialogRef = this.dialog.open(EditarProveedorComponent, {
      width: '700px',
      data: { proveedorId: id },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.obtenerProveedores();
    });
  }

  eliminarProveedor(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Proveedor',
        message: '¿Estás seguro de que deseas eliminar este proveedor?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.proveedoresService.deleteProveedor(id).subscribe({
          next: () => {
            this.obtenerProveedores();
          },
          error: (error) => {
            console.log('Error al eliminar el proveedor:', error);
          },
        });
      }
    });
  }

  reactivarProveedor(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Reactivar Proveedor',
        message: '¿Estás seguro de que deseas reactivar este proveedor?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.proveedoresService.reactivarProveedor(id).subscribe({
          next: () => {
            this.obtenerProveedores();
          },
          error: (error) => {
            console.log('Error al reactivar el proveedor:', error);
          },
        });
      }
    });
  }

  applyFilter(filterValue: string = "") {
    const inputValue = (filterValue as string).trim().toLowerCase();
    this.dataSource.filter = inputValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filtrarPorEstatus(event: any): void {
    const estatus = event.target.value;

    if (estatus === 'todos') {
      this.dataSource.data = this.proveedores;
    } else {
      const proveedoresFiltrados = this.proveedores.filter(row =>
        (estatus === 'activos' && row.estatus === '1') ||
        (estatus === 'inactivos' && row.estatus === '0')
      );
      this.dataSource.data = proveedoresFiltrados;
    }
    this.dataSource.paginator?.firstPage();
  }
}
