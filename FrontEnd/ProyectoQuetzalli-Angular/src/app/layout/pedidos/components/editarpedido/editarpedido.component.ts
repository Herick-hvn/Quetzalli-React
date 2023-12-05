import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiciosPedidoService } from 'src/app/services/Pedido/servicios-pedido.service';

interface PedidoElement {
  Foto: string;
  Nombre: string;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-editarpedido',
  templateUrl: './editarpedido.component.html',
  styleUrls: ['./editarpedido.component.scss']
})
export class EditarpedidoComponent implements OnInit {
  displayedColumns: string[] = ['Foto', 'Nombre', 'precio', 'cantidad'];
  dataSource: PedidoElement[] = [];
  nombreCliente: string = '';
  correoCliente: string = '';
  telefonoCliente: string = '';
  direccionCliente: string = '';
  estatusPedido: number = 0;
  totalPedido: number = 0;

  constructor(
    private pedidoService: ServiciosPedidoService,
    public dialogRef: MatDialogRef<EditarpedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.pedidoId) {
      const pedidoId = this.data.pedidoId;

      this.pedidoService.getPedidoPorId(pedidoId).subscribe(
        (pedido: any) => {
          this.dataSource = pedido.productos.map((item: any) => {
            return {
              Foto: item.producto.foto,
              Nombre: item.producto.nombre,
              precio: item.producto.precioVenta,
              cantidad: item.cantidad
            };
          });

          this.nombreCliente = pedido.cliente.nombre;
          this.correoCliente = pedido.cliente.correo;
          this.telefonoCliente = pedido.cliente.telefono;
          this.direccionCliente = pedido.direccion;
          this.estatusPedido = pedido.pedido.estatus;
          this.totalPedido = pedido.pedido.total;
        },
        (error: any) => {
          console.error('Error al obtener el pedido:', error);
        }
      );
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
