import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarproductorecetaComponent } from './editarproductoreceta.component';

describe('EditarproductorecetaComponent', () => {
  let component: EditarproductorecetaComponent;
  let fixture: ComponentFixture<EditarproductorecetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarproductorecetaComponent]
    });
    fixture = TestBed.createComponent(EditarproductorecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
