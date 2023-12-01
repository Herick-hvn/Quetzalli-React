import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/**
 * Nombre del archivo: servicios-productos
 * Descripción: Archivo para GETS POSTS etc
 * Autor: Sarahi Calderon S.
 * Fecha de creación: 23/07/2023
 * Última modificación por: Sarahi Calderon S.
 * Fecha de última modificación: 23/07/2023
 */

export class ServiciosProductosService {

  constructor(private http: HttpClient) {

  }

 
   //FUNCION PARA GET PRODUCTO
   public getProductos(url: string) {
    return this.http.get(url); //GET a la api de produccion
  }

  //FUNCION PARA POST PRODUCTO
  public postProductos(url: string, body: any) {
    return this.http.post(url, body);
  }

  //FUNCION PARA EDITAR PRODUCTO
  public putProductos(url: string, body: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(url, body, { headers: headers });
  }

  public deleteProductos (url:string , body: any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(url, body, { headers: headers });
  }

}
