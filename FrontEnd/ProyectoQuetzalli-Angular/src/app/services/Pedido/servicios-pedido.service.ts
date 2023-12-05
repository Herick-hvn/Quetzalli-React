import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosPedidoService {

  private apiUrl = 'https://localhost:7239/api/Pedidos/informacion'; // URL base para obtener detalles de un pedido por ID

  constructor(private http: HttpClient) { }

  // FUNCION PARA OBTENER DETALLES DEL PEDIDO POR ID
  public getPedidoPorId(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }
}
