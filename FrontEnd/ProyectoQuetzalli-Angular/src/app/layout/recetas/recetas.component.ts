import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RecetasService } from 'src/app/services/recetas/recetas.service'; // Importa el servicio de recetas
import { AgregarRecetaComponent } from './componenets/agregar-receta/agregar-receta.component';
import { EditarRecetaComponent } from './componenets/editar-receta/editar-receta.component';
import { RecetaPulsera } from 'src/app/Interfaces/recetaPulsera';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.scss'],
})
export class RecetasComponent implements OnInit {
  recetas: RecetaPulsera[] = [];
  dataSource: MatTableDataSource<RecetaPulsera>;
  showNoDataRow: boolean = false;
  

  displayedColumns: string[] = [
    //'foto',
    'nombre',
    'costoProduccion',
    'precioVenta',
    'estatus',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private recetasService: RecetasService, // Usa el servicio de recetas
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<RecetaPulsera>([]);
  }

  ngOnInit(): void {
    this.obtenerRecetas();
    this.applyFilter();
  }

  obtenerRecetas(): void {
    this.recetasService.getRecetas().subscribe({
      next: (recetas) => {
        this.recetas = recetas;

        this.dataSource.data = this.recetas;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log('Error al obtener la lista de recetas:', error);
      },
    });
  }

  abrirDialogoAgregarReceta(): void {
    const dialogRef = this.dialog.open(AgregarRecetaComponent, {
      width: '1200px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.obtenerRecetas();
    });
  }
  
  abrirDialogoEditarReceta(id: number): void {
    const dialogRef = this.dialog.open(EditarRecetaComponent, {
      width: '1200px',
      data: { recetaId: id }, // Pasar solo el ID de la receta
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log('Diálogo de edición cerrado');
      this.obtenerRecetas(); // Puedes mantener esta llamada si necesitas actualizar la lista después de editar
    });
  }
  
  
  

  eliminarReceta(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Receta',
        message: '¿Estás seguro de que deseas eliminar esta receta?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.recetasService.deleteReceta(id).subscribe({
          next: () => {
            this.obtenerRecetas();
          },
          error: (error) => {
            console.log('Error al eliminar la receta:', error);
          },
        });
      }
    });
  }

  reactivarReceta(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Reactivar Receta',
        message: '¿Estás seguro de que deseas reactivar esta receta?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.recetasService.reactivarReceta(id).subscribe({
        next: () => {
          this.obtenerRecetas();
        },
        error: (error) => {
          console.log('Error al reactivar la receta:', error);
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
      this.dataSource.data = this.recetas;
    } else {
      const recetasFiltradas = this.recetas.filter((row) =>
        (estatus === 'activos' && row.estatus === '1') ||
        (estatus === 'inactivos' && row.estatus === '0')
      );
      this.dataSource.data = recetasFiltradas;
    }
    this.dataSource.paginator?.firstPage();
  }
}
