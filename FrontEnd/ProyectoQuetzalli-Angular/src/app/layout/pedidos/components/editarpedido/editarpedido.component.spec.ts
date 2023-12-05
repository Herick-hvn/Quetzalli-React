import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarpedidoComponent } from './editarpedido.component';

describe('EditarpedidoComponent', () => {
  let component: EditarpedidoComponent;
  let fixture: ComponentFixture<EditarpedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarpedidoComponent]
    });
    fixture = TestBed.createComponent(EditarpedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
