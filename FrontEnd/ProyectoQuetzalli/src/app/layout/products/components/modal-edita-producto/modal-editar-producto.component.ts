import { Component, Input  } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from '../../products.component';
import { PostProductos } from 'src/app/Interfaces/productos';

@Component({
    selector: 'app-modal-editar',
    templateUrl: './modal-editar-producto.component.html',
    styleUrls: ['./modal-editar-producto.component.scss']
})


/**
 * Nombre del archivo: ModalEditarProductosComponent
 * Descripción: Controlador del componente modal
 * Autor: Sarahi Calderon S.
 * Fecha de creación: 26/07/2023
 * Última modificación por: Sarahi Calderon S.
 * Fecha de última modificación: 26/07/2023
 */


export class ModalEditarProductoComponent {

    closeResult: string='';
    editaProductos: PostProductos[]

  nombreProducto: string = '';
  descripcion: string = '';
  foto: string = '';
  costoProduccion: number = 0;
  precioVenta: number = 0;
  observaciones: string = '';
  cantidad: number = 0;
  estatus: number = 1;
    @Input() datosProducto: any;


    /*     "nombreProducto": "", 
        "descripcion": "",
        "foto": "string",
        "costoProduccion":,
        "precioVenta": ,
        "observaciones": "string",
        "idStock": ,
        "estatus": "string" */

    constructor(private modalService: NgbModal, private productos: ProductsComponent) {
        this.editaProductos = [];

        
    }
     
    //Función para editar producto 
    public EditarProductoModal() {
        this.estatus=1;
        const nombreArchivo = this.foto.replace(/^.*\\/, "");
        const rutaArchivo='assets/imagenesProductos/'+nombreArchivo;

        this.editaProductos.push({
            'nombreProducto': this.nombreProducto,
            "descripcion": this.descripcion,
            "foto": rutaArchivo,
            "costoProduccion": this.costoProduccion,
            "precioVenta": this.precioVenta,
            "observaciones": this.observaciones,
            "idStock": this.cantidad,
            "estatus": this.estatus
        });
        
        this.productos.EditarProducto(this.editaProductos, this.datosProducto.idproductos);

        this.nombreProducto = "";
        this.descripcion = "";
        this.foto = "";
        this.costoProduccion = 0;
        this.precioVenta = 0;
        this.observaciones = "";
        this.cantidad = 0;
        this.modalService.dismissAll();
    }

    open(content: any) {
        this.nombreProducto=this.datosProducto.nombreProducto
        this.descripcion=this.datosProducto.descripcion
        this.foto=this.datosProducto.foto
        this.costoProduccion=this.datosProducto.costoProduccion
        this.precioVenta=this.datosProducto.precioVenta
        this.observaciones=this.datosProducto.observaciones
        this.cantidad=this.datosProducto.idStock

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

    
}
