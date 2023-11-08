import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRecetasComponent } from './agregar-recetas.component';

describe('AgregarRecetasComponent', () => {
  let component: AgregarRecetasComponent;
  let fixture: ComponentFixture<AgregarRecetasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarRecetasComponent]
    });
    fixture = TestBed.createComponent(AgregarRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
