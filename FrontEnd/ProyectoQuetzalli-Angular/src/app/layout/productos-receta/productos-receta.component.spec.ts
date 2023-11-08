import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosRecetaComponent } from './productos-receta.component';

describe('ProductosRecetaComponent', () => {
  let component: ProductosRecetaComponent;
  let fixture: ComponentFixture<ProductosRecetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductosRecetaComponent]
    });
    fixture = TestBed.createComponent(ProductosRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
