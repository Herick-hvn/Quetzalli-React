import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageClienteComponent } from './landing-page-cliente.component';
import { ModalAlertComponent } from './components/modal-alert/modal-alert.component';
import { ModalAgregarPedidoComponent } from './components/modal-agregar-pedido/modal-agregar-pedido.component';
import { HeaderClienteComponent } from '../header-cliente/header-cliente.component';
import { NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    LandingPageClienteComponent,
    ModalAlertComponent,
    ModalAgregarPedidoComponent,
    HeaderClienteComponent
   
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbDropdown
  ]
})
export class LandingPageClienteModule { }
