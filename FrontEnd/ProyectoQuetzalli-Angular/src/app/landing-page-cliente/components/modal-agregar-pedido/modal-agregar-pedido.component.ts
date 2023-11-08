import { Component, Input } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageClienteComponent } from '../../landing-page-cliente.component';
import { HeaderClienteComponent } from '../../../header-cliente/header-cliente.component';
import * as jsPDF from 'jspdf';


@Component({
    selector: 'app-modal-agregar-pedido',
    templateUrl: './modal-agregar-pedido.component.html',
    styleUrls: ['./modal-agregar-pedido.component.scss']
})


/**
 * Nombre del archivo: ModalAgregarPedidoComponent
 * Descripción: Controlador del componente modal
 * Autor: Sarahi Calderon S.
 * Fecha de creación: 26/07/2023
 * Última modificación por: Sarahi Calderon S.
 * Fecha de última modificación: 26/07/2023
 */


export class ModalAgregarPedidoComponent {

    closeResult?: string;
    agregarPedidoDatos: any[]

    colonia?: string;
    calle?: string;
    nE?: string;
    nI?: string;
    CP?: number;

    constructor(private modalService: NgbModal, private landing: LandingPageClienteComponent, private header: HeaderClienteComponent) {
        this.agregarPedidoDatos = []

    }

    //Función para agregarPedido
    public AgregarPedidoModal() {
        this.agregarPedidoDatos.push({
            "colonia": this.colonia,
            "calle": this.calle,
            "nE": this.nE,
            "nI": this.nI,
            "CP": this.CP
        });
        this.landing.agregarPedido(this.agregarPedidoDatos)

        this.colonia = "";
        this.calle = "";
        this.nE = "";
        this.nI = "";
        this.CP = 0;
        this.modalService.dismissAll();
        this.landing.carrito = []
        this.header.botton = false
        this.header.contador = this.header.contador - this.landing.contadorCarrito
        this.header.totalPagar=0;
        this.landing.contadorCarrito = this.header.contador
        const pdf = new jsPDF.default();;
        window.open("assets/pdfPedido/CodigoPago.pdf", '_blank'); // Agrega el contenido que desees

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
