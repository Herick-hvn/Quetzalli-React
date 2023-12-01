import { Component, Input } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageClienteComponent } from '../../landing-page-cliente.component';


@Component({
    selector: 'app-modal-alert',
    templateUrl: './modal-alert.component.html',
    styleUrls: ['./modal-alert.component.scss']
})


/**
 * Nombre del archivo: ModalAlertComponent
 * Descripción: Controlador del componente modal
 * Autor: Sarahi Calderon S.
 * Fecha de creación: 14/08/2023
 * Última modificación por: Sarahi Calderon S.
 * Fecha de última modificación: 14/08/2023
 */


export class ModalAlertComponent {

    closeResult?: string;
    @Input() datosProducto: any;
    clickCount=1;
    mostrar?:boolean;

    constructor(private modalService: NgbModal, private landing : LandingPageClienteComponent) {
    }
    
    conter(){
        this.landing.incrementCounter(this.clickCount);
    }

    async open(content: any) {

        console.log(this.mostrar)
        this.landing.productoCarrito(this.datosProducto);
        const modalRef = this.modalService.open(content);
    
        const result = await Promise.race([
            modalRef.result,
            new Promise(resolve => setTimeout(resolve, 1000))
        ]);
    
        if (result === undefined) {
            modalRef.dismiss('Timeout');
            this.closeResult = 'Cerrado automáticamente después de 5 segundos';
        } else {
            this.closeResult = `Cerrado con: ${result}`;
        }
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
