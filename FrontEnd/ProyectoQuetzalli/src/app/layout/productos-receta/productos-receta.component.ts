import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { Productos } from 'src/app/Interfaces/productos';
import { ProductosRecetasService } from 'src/app/services/productosRecetas/productos-recetas.service';
import { EditarproductorecetaComponent } from './components/editarproductoreceta/editarproductoreceta.component';
import { AgregarProductoRecetaComponent } from './components/agregarproductoreceta/agregarproductoreceta.component';

@Component({
  selector: 'app-productos-receta',
  templateUrl: './productos-receta.component.html',
  styleUrls: ['./productos-receta.component.scss']
})
export class ProductosRecetaComponent implements OnInit {
  productos: Productos[] = [];
  dataSource: MatTableDataSource<Productos>;
  showNoDataRow: boolean = false;

  displayedColumns: string[] = [
    'foto',
    'nombreProducto',
    'descripcion',
    'costoProduccion',
    'precioVenta',
    'cantidad',
    'estatus',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productosRecetasService: ProductosRecetasService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Productos>([]);
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.applyFilter();
  }

  obtenerProductos(): void {
    this.productosRecetasService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;

        this.dataSource.data = this.productos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log('Error al obtener la lista de productos:', error);
      },
    });
  }

  abrirDialogoAgregarProductoReceta(): void {
    const dialogRef = this.dialog.open(AgregarProductoRecetaComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.obtenerProductos();
    });
  }

  abrirDialogoEditarProductoReceta(id: number): void {
    const dialogRef = this.dialog.open(EditarproductorecetaComponent, {
      width: '700px',
      data: { productoId: id },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.obtenerProductos();
    });
  }

  eliminarProductoReceta(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Producto Receta',
        message: '¿Estás seguro de que deseas eliminar este producto receta?',
      },
    });

    

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productosRecetasService.deleteProducto(id).subscribe({
          next: () => {
            this.obtenerProductos();
          },
          error: (error) => {
            console.log('Error al eliminar el producto receta:', error);
          },
        });
      }
    });
  }

  reactivarProductoReceta(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Reactivar Producto Receta',
        message: '¿Estás seguro de que deseas reactivar este producto receta?',
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productosRecetasService.reactivarProducto(id).subscribe({
          next: () => {
            console.log('Producto receta reactivado exitosamente');
            this.obtenerProductos(); // Actualiza la lista de productos receta
          },
          error: (error) => {
            console.error('Error al reactivar el producto receta:', error);
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
      this.dataSource.data = this.productos;
    } else {
      const productosFiltrados = this.productos.filter(row =>
        (estatus === 'activos' && row.estatus === "1") ||
        (estatus === 'inactivos' && row.estatus === "0")
      );
      this.dataSource.data = productosFiltrados;
    }
    this.dataSource.paginator?.firstPage();
  }
}
