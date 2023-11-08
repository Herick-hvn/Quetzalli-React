import { Component, Input } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from '../../products.component';
@Component({
    selector: 'app-modal-eliminar',
    templateUrl: './modal-eliminar-producto.component.html',
    styleUrls: ['./modal-eliminar-producto.component.scss']
})


/**
 * Nombre del archivo: ModalEliminarProductosComponent
 * Descripción: Controlador del componente modal
 * Autor: Sarahi Calderon S.
 * Fecha de creación: 27/07/2023
 * Última modificación por: Sarahi Calderon S.
 * Fecha de última modificación: 27/07/2023
 */


export class ModalEliminarProductoComponent {

    closeResult: string='';
    @Input() datosProductoDelate: any;
    n:string;
    s:string;

    constructor(private modalService: NgbModal, private productos: ProductsComponent) {
        this.n = "no";
        this.s = "si";
    }

    //Función para eliminar producto 
    public EliminarProductoModal(decicion:any) {
        if(decicion == "si"){
            this.productos.EliminarProducto(this.datosProductoDelate, this.datosProductoDelate.idproductos);
        }else{
            this.modalService.dismissAll();
        }
        
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


}
