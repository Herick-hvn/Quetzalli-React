import { TestBed } from '@angular/core/testing';

import { ProductosRecetasService } from './productos-recetas.service';

describe('ProductosRecetasService', () => {
  let service: ProductosRecetasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosRecetasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
