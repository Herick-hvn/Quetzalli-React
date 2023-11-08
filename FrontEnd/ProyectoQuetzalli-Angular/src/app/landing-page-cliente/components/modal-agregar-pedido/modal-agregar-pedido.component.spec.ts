import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalAgregarPedidoComponent } from './modal-agregar-pedido.component';

describe('ModalComponent', () => {
    let component: ModalAgregarPedidoComponent;
    let fixture: ComponentFixture<ModalAgregarPedidoComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NgbModule],
            declarations: [ModalAgregarPedidoComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalAgregarPedidoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
