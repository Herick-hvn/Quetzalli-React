import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { Proveedor } from 'src/app/Interfaces/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private apiUrl = 'https://localhost:7239/api/Proveedores'; // Actualiza la URL según la ubicación de tu API

  constructor(private http: HttpClient) { }

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl);
  }

  addProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.apiUrl, proveedor);
  }

  updateProveedor(id: number, proveedor: Proveedor): Observable<Proveedor> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Proveedor>(url, proveedor);
  }

  deleteProveedor(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }


  reactivarProveedor(id: number): Observable<any> {
    return this.getProveedor(id).pipe(
      switchMap((proveedor) => {
        if (proveedor) {
          proveedor.estatus = '1'; // Cambiar el estado a "1" (activo)
          return this.updateProveedor(id, proveedor); // Actualizar el proveedor
        } else {
          throw new Error(`Proveedor con ID ${id} no encontrado.`);
        }
      }),
      catchError((error) => {
        console.error('Error al reactivar el proveedor:', error);
        return of(null); // Devolver un observable con valor null en caso de error
      })
    );
  }

  getProveedor(id: number): Observable<Proveedor | null> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Proveedor>(url).pipe(
      catchError(() => {
        return of(null); // Devolver null si no se encuentra el proveedor
      })
    );
  }

}
