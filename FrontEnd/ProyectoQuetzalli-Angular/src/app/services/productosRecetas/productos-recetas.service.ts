import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { Productos } from 'src/app/Interfaces/productos';


@Injectable({
  providedIn: 'root'
})
export class ProductosRecetasService {

  private apiUrl = 'https://localhost:7239/api/Productos'; // Actualiza la URL según la ubicación de tu API

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.apiUrl);
  }

  addProducto(producto: Productos): Observable<Productos> {
    console.log(producto)
    return this.http.post<Productos>(this.apiUrl, producto);
    
  }

  updateProducto(id: number, producto: Productos): Observable<Productos> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Productos>(url, producto);
  }

  deleteProducto(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  reactivarProducto(id: number): Observable<any> {
    return this.getProducto(id).pipe(
      switchMap((producto) => {
        if (producto) {
          producto.estatus = "1"; // Cambiar el estado a activo
          return this.updateProducto(id, producto); // Actualizar el producto
        } else {
          throw new Error(`Producto con ID ${id} no encontrado.`);
        }
      }),
      catchError((error) => {
        console.error('Error al reactivar el producto:', error);
        return of(null); // Devolver un observable con valor null en caso de error
      })
    );
  }

  getProducto(id: number): Observable<Productos | null> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Productos>(url).pipe(
      catchError(() => {
        return of(null); // Devolver null si no se encuentra el producto
      })
    );
  }
}

