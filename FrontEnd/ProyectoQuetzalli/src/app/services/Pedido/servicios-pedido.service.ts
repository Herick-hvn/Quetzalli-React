import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiciosPedidoService {

  constructor(private http: HttpClient) { }

  //FUNCION PARA POST PEDIDO
  public postPedido(url: string, body: any) {
    console.log(url, body)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers: headers });
  }

}
