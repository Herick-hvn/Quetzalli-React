import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostProductos } from 'src/app/Interfaces/productos';
import { ProductsComponent } from '../../products.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-agregar-producto.component.html',
  styleUrls: ['./modal-agregar-producto.component.scss']
})
export class ModalAgregarProductoComponent {

  closeResult: string = ''; // Inicializar la propiedad closeResult
  agregarProductos: PostProductos[] = [];

  nombreProducto: string = '';
  descripcion: string = '';
  foto: string = '';
  costoProduccion: number = 0;
  precioVenta: number = 0;
  observaciones: string = '';
  cantidad: number = 0;
  estatus: number = 1;

  constructor(private modalService: NgbModal, private productos: ProductsComponent) {}

  AgregarProductoModal() {
    const nombreArchivo = this.foto.replace(/^.*\\/, '');
    const rutaArchivo = 'assets/imagenesProductos/' + nombreArchivo;

    const nuevoProducto: PostProductos = {
      nombreProducto: this.nombreProducto,
      descripcion: this.descripcion,
      foto: rutaArchivo,
      costoProduccion: this.costoProduccion,
      precioVenta: this.precioVenta,
      observaciones: this.observaciones,
      idStock: this.cantidad,
      estatus: this.estatus
    };

    this.agregarProductos.push(nuevoProducto);
    this.productos.AgregarProducto(this.agregarProductos);

    this.ResetearCampos();
    this.modalService.dismissAll();
  }

  open(content: any) {
    this.modalService.open(content).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private ResetearCampos(): void {
    this.nombreProducto = '';
    this.descripcion = '';
    this.foto = '';
    this.costoProduccion = 0;
    this.precioVenta = 0;
    this.observaciones = '';
    this.cantidad = 0;
  }
}
