import { TestBed } from '@angular/core/testing';

import { ServiciosPedidoService } from './servicios-pedido.service';

describe('ServiciosPedidoService', () => {
  let service: ServiciosPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
