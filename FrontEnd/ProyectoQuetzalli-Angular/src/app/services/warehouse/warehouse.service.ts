import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private baseUrl = 'https://localhost:7239/api'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  // Insumos Inventario
  getInsumos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/WarehouseInsumos`);
  }

  createInsumo(insumo: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/WarehouseInsumos`, insumo);
  }

  // Productos Inventario
  getProductos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/WarehouseProductos`);
  }

  createProducto(producto: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/WarehouseProductos`, producto);
  }

  // Ranking Clientes
  getRankingClientes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/WarehouseClientes`);
  }

  // Ventas
  getVentas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/WarehouseVentas`);
  }

  createVenta(venta: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/WarehouseVentas`, venta);
  }
}
