import { TestBed } from '@angular/core/testing';

import { ServiciosProductosService } from './servicios-productos.service';

describe('ServiciosProductosService', () => {
  let service: ServiciosProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
