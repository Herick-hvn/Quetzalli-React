import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'src/app/Interfaces/pedido';
import { UsuarioConPedido, UsuarioConPersonaYPedido } from 'src/app/Interfaces/usuarios';
import { ServiciosPedidoService } from 'src/app/services/Pedido/servicios-pedido.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  datosUsuariosPedidos:UsuarioConPersonaYPedido[]=[]
  dataSource: MatTableDataSource<UsuarioConPersonaYPedido>;
  showNoDataRow: boolean = false;
  

  displayedColumns: string[] = [
    'cliente',
    'correo',
    'telefono',
    'fechaPedido',
    'fechaEntrega',
    'total',
    'estatus',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(
    private usuariosService: UsuariosService,
  ) {
    this.dataSource = new MatTableDataSource<UsuarioConPersonaYPedido>([]);
  }

  ngOnInit(): void {
    this.obtenerUsuariosConPedidos();
  }

  
  obtenerUsuariosConPedidos(): void {
    this.usuariosService.getUsuariosConPersonasYPedidos().subscribe({
      next: (usuariosConPedidos) => {
        this.datosUsuariosPedidos = usuariosConPedidos;
        this.dataSource.data = this.datosUsuariosPedidos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log('Error al obtener la lista de usuarios y pedidos:', error);
      },
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
      this.dataSource.data = this.datosUsuariosPedidos;
    } else {
      const pedidosFiltrados = this.datosUsuariosPedidos.filter(row => 
        row.pedido && ( // Asegúrate de que 'pedido' existe
          (estatus === 'Entregado' && row.pedido.estatus === 2) ||
          (estatus === 'Procesando' && row.pedido.estatus === 1) ||
          (estatus === 'Enviado' && row.pedido.estatus === 3) ||
          (estatus === 'Cancelado' && row.pedido.estatus === 4)
        )
      );
      this.dataSource.data = pedidosFiltrados;
    }
    this.dataSource.paginator?.firstPage();
  }

    // Método para obtener la etiqueta del estado según el número
    getStatusLabel(estatus: number): string {
      switch (estatus) {
        case 1:
          return 'Procesando';
        case 2:
          return 'Entregado';
        case 3:
          return 'Enviado';
        case 4:
          return 'Cancelado';
        default:
          return 'Desconocido';
      }
    }
  
    // Método para obtener el color del texto según el estado
    getColorForStatus(estatus: number): string {
      switch (estatus) {
        case 1:
          return 'blue'; // Color para 'Entregado'
        case 2:
          return 'green'; // Color para 'Procesando'
        case 3:
          return 'orange'; // Color para 'Enviado'
        case 4:
          return 'red'; // Color para 'Cancelado'
        default:
          return 'black'; // Color predeterminado
      }
    }
  
  




















}
