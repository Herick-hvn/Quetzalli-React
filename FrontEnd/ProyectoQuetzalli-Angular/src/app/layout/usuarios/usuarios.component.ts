import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonaConUsuario } from 'src/app/Interfaces/personaConUsuario';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AgregarUsuarioComponent } from './componenets/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './componenets/editar-usuario/editar-usuario.component';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  datosPersonasUsuarios: PersonaConUsuario[] = [];
  dataSource: MatTableDataSource<PersonaConUsuario>;
  showNoDataRow: boolean = false;

  displayedColumns: string[] = [
    'nombre',
    'telefono',
    'correo',
    'rol',
    'estatus',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private usuariosService: UsuariosService,
    private dialog: MatDialog // Agrega esta línea para inyectar MatDialog
  ) {
    this.dataSource = new MatTableDataSource<PersonaConUsuario>([]);
  }
  
  ngOnInit(): void {
    this.obtenerPersonasConUsuarios();
    this.applyFilter();
  }

  obtenerPersonasConUsuarios(): void {
    this.usuariosService.getPersonasWithUsuarios().subscribe({
      next: (personasConUsuarios) => {
        this.datosPersonasUsuarios = personasConUsuarios;
        this.dataSource.data = this.datosPersonasUsuarios;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log('Error al obtener la lista de personas y usuarios:', error);
      },
    });
  }

  

  abrirDialogoCrearCuenta(): void {
    const dialogRef = this.dialog.open(AgregarUsuarioComponent, {
      width: '700px', // Personaliza el ancho del diálogo según tus necesidades
    });

    dialogRef.afterClosed().subscribe(() => {
      this.obtenerPersonasConUsuarios();
    });
  }

  
  abrirDialogoEditarCuenta(id: number): void {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: '700px', // Personaliza el ancho del diálogo según tus necesidades
      data: { userId: id }, // Pasa el ID del usuario al diálogo de edición
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.obtenerPersonasConUsuarios();
    });
  }


  eliminarUsuario(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Usuario',
        message: '¿Estás seguro de que deseas eliminar este usuario?',
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuariosService.deleteUsuario(id).subscribe({
          next: () => {
            this.obtenerPersonasConUsuarios();
          },
          error: (error) => {
            console.log('Error al eliminar el usuario:', error);
          },
        });
      }
    });
  }
  
  reactivarUsuario(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Reactivar Usuario',
        message: '¿Estás seguro de que deseas reactivar este usuario?',
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuariosService.reactivarUsuario(id).subscribe({
          next: () => {
            this.obtenerPersonasConUsuarios();
          },
          error: (error) => {
            console.log('Error al reactivar el usuario:', error);
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
      this.dataSource.data = this.datosPersonasUsuarios;
    } else {
      const usuariosFiltrados = this.datosPersonasUsuarios.filter(row => 
        (estatus === 'activos' && row.usuario.active === 1) ||
        (estatus === 'inactivos' && row.usuario.active === 0)
      );
      this.dataSource.data = usuariosFiltrados;
    }
    this.dataSource.paginator?.firstPage();
  }
 
  
  
  
  

}
