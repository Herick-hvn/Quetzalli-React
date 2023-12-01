import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { InsumosService } from 'src/app/services/insumos/insumos.service';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service'; // Importa el servicio de proveedores
import { AgregarInsumoComponent } from './componenets/agregar-insumo/agregar-insumo.component';
import { EditarInsumoComponent } from './componenets/editar-insumo/editar-insumo.component';
import { Insumo } from 'src/app/Interfaces/Insumo';


@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.scss'],
})
export class InsumosComponent implements OnInit {
  insumos: Insumo[] = [];
  dataSource: MatTableDataSource<Insumo>;
  showNoDataRow: boolean = false;

  displayedColumns: string[] = [
    'nombreInsumo',
    'nombreProveedor', // Añade la columna para el nombre del proveedor
    'cantidad',
    'unidad',
    'precio',
    'estatus',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private insumosService: InsumosService,
    private proveedoresService: ProveedoresService, // Agrega el servicio de proveedores
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Insumo>([]);
  }

  ngOnInit(): void {
    this.obtenerInsumos();
    this.applyFilter();
  }

  obtenerInsumos(): void {
    this.insumosService.getInsumos().subscribe({
      next: (insumos) => {
        this.insumos = insumos;

        // Obtener los nombres de los proveedores para cada insumo
        for (const insumo of this.insumos) {
          this.proveedoresService.getProveedor(insumo.idProveedor).subscribe(
            (proveedor) => {
              if (proveedor) {
                insumo.nombreProveedor = proveedor.nombreEmpresa;
              }
            }
          );
        }

        this.dataSource.data = this.insumos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log('Error al obtener la lista de insumos:', error);
      },
    });
  }

  abrirDialogoAgregarInsumo(): void {
    const dialogRef = this.dialog.open(AgregarInsumoComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.obtenerInsumos();
    });
  }

  abrirDialogoEditarInsumo(id: number): void {
    const dialogRef = this.dialog.open(EditarInsumoComponent, {
      width: '700px',
      data: { insumoId: id },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.obtenerInsumos();
    });
  }

  eliminarInsumo(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Insumo',
        message: '¿Estás seguro de que deseas eliminar este insumo?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.insumosService.deleteInsumo(id).subscribe({
          next: () => {
            this.obtenerInsumos();
          },
          error: (error) => {
            console.log('Error al eliminar el insumo:', error);
          },
        });
      }
    });
  }

  reactivarInsumo(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Reactivar Insumo',
        message: '¿Estás seguro de que deseas reactivar este insumo?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.insumosService.reactivarInsumo(id).subscribe({
          next: () => {
            this.obtenerInsumos();
          },
          error: (error) => {
            console.log('Error al reactivar el insumo:', error);
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
      this.dataSource.data = this.insumos;
    } else {
      const insumosFiltrados = this.insumos.filter(row =>
        (estatus === 'activos' && row.estatus === '1') ||
        (estatus === 'inactivos' && row.estatus === '0')
      );
      this.dataSource.data = insumosFiltrados;
    }
    this.dataSource.paginator?.firstPage();
  }
}
