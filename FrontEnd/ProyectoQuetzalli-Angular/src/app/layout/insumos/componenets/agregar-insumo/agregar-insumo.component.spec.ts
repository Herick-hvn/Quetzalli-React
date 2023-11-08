import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarInsumoComponent } from './agregar-insumo.component';

describe('AgregarInsumoComponent', () => {
  let component: AgregarInsumoComponent;
  let fixture: ComponentFixture<AgregarInsumoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarInsumoComponent]
    });
    fixture = TestBed.createComponent(AgregarInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
